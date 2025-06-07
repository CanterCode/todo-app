import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CreateModalContextType {
  showCreateModal: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

const CreateModalContext = createContext<CreateModalContextType | undefined>(undefined);

export const CreateModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  return (
    <CreateModalContext.Provider value={{ showCreateModal, openCreateModal, closeCreateModal }}>
      {children}
    </CreateModalContext.Provider>
  );
};

export const useCreateModal = () => {
  const context = useContext(CreateModalContext);
  if (!context) {
    throw new Error("useCreateModal must be used within a CreateModalProvider");
  }
  return context;
};