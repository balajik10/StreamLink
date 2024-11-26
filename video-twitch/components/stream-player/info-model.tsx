"use client"; 
import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { useState, useTransition , useRef,ElementRef} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
  
}: InfoModalProps) => {

    const [name,setName]=useState(initialName)
    const [isPending, startTransition] = useTransition();
    const closeRef=useRef<ElementRef<"button">>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };
      
      
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        startTransition(() => {
          updateStream({ name: name })
            .then(() => {
                toast.success("Stream updated")
                closeRef?.current?.click();
            })
            .catch(() => toast.error("Something went wrong"));
        });
      };
      
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
  <DialogHeader>
    <DialogTitle>
        Edit stream info
        </DialogTitle>
  </DialogHeader>
  <form onSubmit={onSubmit} className="space-y-14">
    <div className="space-y-2">
      <Label>
        Name
        </Label>
      <Input

        placeholder="Stream name"
        onChange={onChange}
        value={name}
        disabled={isPending}
      />
    </div>
    <div className="flex justify-between">
  <DialogClose ref={ closeRef} asChild>
    <Button 
    type="button" 
    variant="ghost">
      Cancel
    </Button>
  </DialogClose>
  <Button         
  disabled={isPending}
  variant="primary" 
  type="submit">
    Save
  </Button>
</div>

  </form>
</DialogContent>

    </Dialog>
  );
};
