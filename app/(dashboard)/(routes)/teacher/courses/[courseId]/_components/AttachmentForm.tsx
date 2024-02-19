"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

interface AttachmentFormProps {
  initialData: Course & {attachments: Attachment[]}
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState<string | null>(null)

  const ToggleButton = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment updated");
      ToggleButton();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const onDelete = async (id: string) => {
    try {

      setIsDelete(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Course attachment deleted")
      router.refresh( )

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    } finally {
      setIsDelete(null)
    } 
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={ToggleButton} variant="outline">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {!isEditing && (<>
        {initialData.attachments.length === 0 && (
          <div className="text-sm mt-2 italic text-gray-500">
            No attachment yet
          </div>        
        )}
      {initialData.attachments.length > 0 && (
        <div className="space-y-3">
          {initialData.attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center mt-3 p-3 w-full bg-sky-100 border-sky-700 border text-sky-700 rounded-md">
              <File className="w-4 h-4 mr-1 flex-shrink" />
              <p className="text-sm line-clamp-1">
                {attachment.name}
              </p>
              {isDelete === attachment.id && (
                <div className="ml-auto">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {isDelete !== attachment.id && (
                <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      </>
      
      )
      }

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url: any) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add resource and attachment here
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentForm