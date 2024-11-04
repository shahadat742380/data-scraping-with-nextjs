// import core package
import React from 'react';
import Image from 'next/image';


// import shad cn ui
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
  } from "@/components/ui/dialog";
  import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
  import { Button } from '../ui/button';

// import image adn icons
import IcoCheck from '@/assets/svg/IcoCheck';
import modalImg from "@/assets/images/modal.png";

// modal props type
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Modal: React.FC<ModalProps>  = ({isOpen, onClose }) => {
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[345px] overflow-hidden rounded-2xl">
              <div>
                <div className="h-[142px] bg-vvp-primary relative">
                  <div>
                    <Image
                      src={modalImg}
                      alt="image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-[50px] left-[125px]">
                    <IcoCheck />
                  </div>
                </div>
                <div className="px-6 pb-6 mt-[60px]">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold text-vvp-gray">
                      Thanks for Registration
                    </DialogTitle>
                    <DialogDescription className="text-center text-vvp-gray mt-2">
                      We will inform you via email and WhatsApp, when the app is
                      ready to go live with a special invite.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        className="mt-8 w-full bg-vvp-primary hover:bg-vvp-primary/90"
                      >
                        Okay
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
    );
};

export default Modal;