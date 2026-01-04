import { createContext, useContext, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Button } from './button';
import { cn } from '@/utils/cn';

const AlertDialogContext = createContext<{ onOpenChange: (open: boolean) => void } | null>(null);

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ onOpenChange }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </AlertDialogContext.Provider>
  );
}

export const AlertDialogContent = DialogContent;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogFooter = DialogFooter;

export interface AlertDialogActionProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AlertDialogAction({ children, onClick, className }: AlertDialogActionProps) {
  return (
    <Button onClick={onClick} className={cn(className)}>
      {children}
    </Button>
  );
}

export interface AlertDialogCancelProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AlertDialogCancel({ children, onClick, className }: AlertDialogCancelProps) {
  const context = useContext(AlertDialogContext);
  
  const handleClick = () => {
    onClick?.();
    context?.onOpenChange(false);
  };

  return (
    <Button variant="ghost" onClick={handleClick} className={cn("mt-2 sm:mt-0", className)}>
      {children}
    </Button>
  );
}
