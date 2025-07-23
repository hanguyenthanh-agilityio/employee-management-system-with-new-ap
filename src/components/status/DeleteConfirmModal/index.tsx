import { CloseIcon, TrashIcon } from '@/icons';
import clsx from 'clsx';

// Components
import { Button } from '@/components';
import { ConfirmModalType } from '@/types/components';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmModalType) => (
  <div
    className={clsx(
      'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity',
      { hidden: !isOpen },
    )}
  >
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="deleteModal"
          onClick={onClose}
        >
          <CloseIcon />
          <span className="sr-only">Close modal</span>
        </button>
        <TrashIcon />
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Button
            data-modal-toggle="deleteModal"
            type="button"
            className="text-gray-900 bg-white py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
            onClick={onClose}
          >
            No, cancel
          </Button>
          <Button
            type="submit"
            className={clsx(
              'py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none',
              {
                'bg-red hover:bg-[#b91c1c] focus:ring-red': !isLoading,
                'bg-gray-400 cursor-not-allowed opacity-60': isLoading,
              },
            )}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : "Yes, I'm sure"}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
