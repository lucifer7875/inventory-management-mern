import { createPortal } from 'react-dom';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    itemName: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const DeleteConfirmationModal = ({
    isOpen,
    itemName,
    onConfirm,
    onCancel,
    isLoading
}: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex items-center gap-3 text-destructive mb-4">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </div>
                        <h2 className="text-xl font-bold">Confirm Delete</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">
                        Are you sure you want to delete <span className="text-foreground font-semibold">"{itemName}"</span>? This action cannot be undone.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 rounded-md border border-input bg-background hover:bg-muted font-medium transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                                    Deleting...
                                </>
                            ) : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
