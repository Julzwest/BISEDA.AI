// User model for subscription and usage tracking
// Using in-memory storage for MVP (can be migrated to database later)

class User {
  constructor(userId) {
    this.userId = userId;
    this.subscriptionTier = 'free'; // 'free', 'basic', 'premium'
    this.subscriptionStatus = 'active'; // 'active', 'cancelled', 'expired'
    this.subscriptionExpiresAt = null;
    this.stripeCustomerId = null;
    this.stripeSubscriptionId = null;
    this.createdAt = new Date();
    this.lastActiveAt = new Date();
    
    // Security tracking
    this.securityStrikes = 0; // Track security violations
    this.isBlocked = false; // Block status
    
    // Usage tracking (daily reset)
    this.dailyUsage = {
      date: new Date().toDateString(),
      messages: 0,
      imageAnalyses: 0
    };
    
    // Monthly usage (for analytics)
    this.monthlyUsage = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      totalMessages: 0,
      totalImageAnalyses: 0,
      totalCost: 0,
      totalTokens: 0,
      totalOpenAICalls: 0
    };
    
    // Cost tracking
    this.costTracking = {
      totalSpent: 0,
      lastResetDate: new Date().toDateString(),
      dailyCost: 0
    };
    
    // Credits system
    this.credits = 0;
    this.creditHistory = [];
  }
  
  // Calculate cost from token usage (OpenAI pricing: gpt-4o-mini)
  // Input: $0.15 per 1M tokens, Output: $0.60 per 1M tokens
  calculateCost(promptTokens, completionTokens) {
    const inputCost = (promptTokens / 1_000_000) * 0.15;
    const outputCost = (completionTokens / 1_000_000) * 0.60;
    return inputCost + outputCost;
  }
  
  // Record OpenAI usage and cost
  recordOpenAIUsage(promptTokens, completionTokens) {
    const cost = this.calculateCost(promptTokens, completionTokens);
    
    // Update monthly usage
    this.monthlyUsage.totalTokens += (promptTokens + completionTokens);
    this.monthlyUsage.totalCost += cost;
    this.monthlyUsage.totalOpenAICalls += 1;
    
    // Update cost tracking
    const today = new Date().toDateString();
    if (this.costTracking.lastResetDate !== today) {
      this.costTracking.dailyCost = 0;
      this.costTracking.lastResetDate = today;
    }
    this.costTracking.dailyCost += cost;
    this.costTracking.totalSpent += cost;
    
    return cost;
  }
  
  // Get cost statistics
  getCostStats() {
    return {
      totalSpent: this.costTracking.totalSpent,
      dailyCost: this.costTracking.dailyCost,
      monthlyCost: this.monthlyUsage.totalCost,
      averageCostPerMessage: this.monthlyUsage.totalMessages > 0 
        ? this.monthlyUsage.totalCost / this.monthlyUsage.totalMessages 
        : 0,
      totalTokens: this.monthlyUsage.totalTokens,
      totalOpenAICalls: this.monthlyUsage.totalOpenAICalls
    };
  }

  // Check if user can send message
  canSendMessage() {
    // ADMIN BYPASS: Always allow admin users
    if (process.env.ADMIN_MODE === 'true') {
      return true;
    }
    
    // Reset daily usage if new day
    const today = new Date().toDateString();
    if (this.dailyUsage.date !== today) {
      this.dailyUsage = {
        date: today,
        messages: 0,
        imageAnalyses: 0
      };
    }

    const limits = this.getLimits();
    
    // Check subscription limit first
    if (this.dailyUsage.messages < limits.messagesPerDay) {
      return true;
    }
    
    // If subscription limit reached, check credits
    if (this.credits > 0) {
      return true;
    }
    
    // BLOCKED: No subscription limit left AND no credits
    return false;
  }
  
  // Record credit usage (called when using credits)
  recordCreditUsage(amount = 1) {
    if (this.credits >= amount) {
      this.credits -= amount;
      this.creditHistory.push({
        date: new Date(),
        type: 'used',
        amount: amount,
        reason: 'message'
      });
      return true;
    }
    return false;
  }
  
  // Use credits for a message
  useCredits(amount = 1) {
    if (this.credits >= amount) {
      this.credits -= amount;
      this.creditHistory.push({
        date: new Date(),
        type: 'used',
        amount: amount,
        reason: 'message'
      });
      return true;
    }
    return false;
  }
  
  // Add credits
  addCredits(amount, source = 'purchase') {
    this.credits += amount;
    this.creditHistory.push({
      date: new Date(),
      type: 'added',
      amount: amount,
      source: source
    });
  }
  
  // Get credit balance
  getCredits() {
    return {
      balance: this.credits,
      history: this.creditHistory.slice(-10) // Last 10 transactions
    };
  }

  // Check if user can analyze image
  canAnalyzeImage() {
    const limits = this.getLimits();
    return this.subscriptionTier !== 'free' && this.dailyUsage.imageAnalyses < limits.imageAnalysesPerDay;
  }

  // Get subscription limits (OPTIMIZED FOR PROFITABILITY)
  getLimits() {
    switch (this.subscriptionTier) {
      case 'free':
        return {
          messagesPerDay: 5, // Reduced from 10 to reduce costs
          imageAnalysesPerDay: 0,
          adultContent: false
        };
      case 'starter':
        return {
          messagesPerDay: 50,
          imageAnalysesPerDay: 0,
          adultContent: true
        };
      case 'basic':
        return {
          messagesPerDay: 100, // Legacy tier
          imageAnalysesPerDay: 0,
          adultContent: true
        };
      case 'pro':
        return {
          messagesPerDay: 200,
          imageAnalysesPerDay: 20,
          adultContent: true
        };
      case 'premium':
        return {
          messagesPerDay: 1000, // Increased cap
          imageAnalysesPerDay: 100,
          adultContent: true
        };
      default:
        return {
          messagesPerDay: 5,
          imageAnalysesPerDay: 0,
          adultContent: false
        };
    }
  }

  // Record message usage
  recordMessage() {
    const today = new Date().toDateString();
    if (this.dailyUsage.date !== today) {
      this.dailyUsage = {
        date: today,
        messages: 0,
        imageAnalyses: 0
      };
    }
    
    this.dailyUsage.messages++;
    this.monthlyUsage.totalMessages++;
    this.lastActiveAt = new Date();
  }

  // Record image analysis usage
  recordImageAnalysis() {
    const today = new Date().toDateString();
    if (this.dailyUsage.date !== today) {
      this.dailyUsage = {
        date: today,
        messages: 0,
        imageAnalyses: 0
      };
    }
    
    this.dailyUsage.imageAnalyses++;
    this.monthlyUsage.totalImageAnalyses++;
    this.lastActiveAt = new Date();
  }

  // Record cost
  recordCost(amount) {
    this.monthlyUsage.totalCost += amount;
  }

  // Upgrade subscription
  upgradeTo(tier, stripeCustomerId = null, stripeSubscriptionId = null, expiresAt = null) {
    this.subscriptionTier = tier;
    this.subscriptionStatus = 'active';
    this.stripeCustomerId = stripeCustomerId;
    this.stripeSubscriptionId = stripeSubscriptionId;
    this.subscriptionExpiresAt = expiresAt;
  }

  // Cancel subscription
  cancelSubscription() {
    this.subscriptionStatus = 'cancelled';
    // Keep access until expiration date
  }

  // Check if subscription is active
  isSubscriptionActive() {
    if (this.subscriptionTier === 'free') return true;
    if (this.subscriptionStatus !== 'active') return false;
    if (this.subscriptionExpiresAt && new Date() > this.subscriptionExpiresAt) {
      this.subscriptionStatus = 'expired';
      this.subscriptionTier = 'free';
      return false;
    }
    return true;
  }

  // Get usage stats
  getUsageStats() {
    const limits = this.getLimits();
    return {
      tier: this.subscriptionTier,
      status: this.subscriptionStatus,
      credits: this.credits,
      dailyUsage: {
        messages: this.dailyUsage.messages,
        messagesLimit: limits.messagesPerDay,
        imageAnalyses: this.dailyUsage.imageAnalyses,
        imageAnalysesLimit: limits.imageAnalysesPerDay,
        remainingMessages: Math.max(0, limits.messagesPerDay - this.dailyUsage.messages)
      },
      monthlyUsage: {
        totalMessages: this.monthlyUsage.totalMessages,
        totalImageAnalyses: this.monthlyUsage.totalImageAnalyses,
        totalCost: this.monthlyUsage.totalCost
      },
      expiresAt: this.subscriptionExpiresAt,
      canSendMessage: this.canSendMessage()
    };
  }

  // Convert to JSON
  toJSON() {
    return {
      userId: this.userId,
      subscriptionTier: this.subscriptionTier,
      subscriptionStatus: this.subscriptionStatus,
      subscriptionExpiresAt: this.subscriptionExpiresAt,
      createdAt: this.createdAt,
      lastActiveAt: this.lastActiveAt,
      dailyUsage: this.dailyUsage,
      monthlyUsage: this.monthlyUsage
    };
  }
}

// In-memory user store (replace with database in production)
const users = new Map();

// Get or create user
function getUser(userId) {
  if (!users.has(userId)) {
    users.set(userId, new User(userId));
  }
  return users.get(userId);
}

// Save user (for persistence - implement database save here)
function saveUser(user) {
  users.set(user.userId, user);
  // TODO: Save to database
}

export { User, getUser, saveUser };

