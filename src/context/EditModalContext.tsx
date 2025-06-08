import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface EditModalContextType {
    showEditModal: boolean;
    openEditModal: () => void;
    closeEditModal: () => void;
}

const EditModalContext = createContext<EditModalContextType | undefined>(undefined);

export const EditModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    return (
        <EditModalContext.Provider value={{ showEditModal, openEditModal, closeEditModal }}>
            {children}
        </EditModalContext.Provider>
    );
};

export const useEditModalContext = () => {
    const context = useContext(EditModalContext);
    if (!context) {
        throw new Error("useEditModal must be used within an EditModalProvider");
    }
    return context;
};