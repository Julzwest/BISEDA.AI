import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Sparkles } from 'lucide-react';

export default function LimitReachedModal({ isOpen, onClose, onUpgrade }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Limiti u arrit</h2>
            <p className="text-slate-300 text-sm">
              Keni përdorur të gjitha mesazhet tuaja për sot. Përmirësoni planin për të vazhduar!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold h-12 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Përmirëso Planin
            </Button>
            <Button
              onClick={onClose}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white h-11"
            >
              Mbyll
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

