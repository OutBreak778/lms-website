"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string
}

const formSchema = z.object({
  title: z.string().min(1)
});

const ChapterTitleForm: React.FC<ChapterTitleFormProps> = ({ initialData, courseId, chapterId }) => {
  const [isEdit, setEdit] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
        toast.success("Title changed successfully")
        toggleButton()
        router.refresh()
    } catch (error) {
        toast.error("Something went wrong!")
    }
  };

  const toggleButton = () => setEdit((current) => !current);

  return (
    <div className="mt-6 border p-4 bg-slate-100 rounded-md">
      <div className="flex items-center justify-between font-medium">
      <p className="text-lg font-semibold mt-2">Chapter Title</p>
        <Button variant="outline" onClick={toggleButton}>
          {isEdit ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="w-4 h-4 mr-2" /> Edit
            </>
          )}
        </Button>
      </div>
      {!isEdit && (
        <p className="text-sm mt-2">
            {initialData.title}
        </p>
      )}
      {isEdit && (
        <Form {...form}>
            <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="title" render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input disabled={isSubmitting}  placeholder={`Change title from ${initialData.title} to ...`} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex items-center gap-x-3">
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                        Save
                    </Button>
                </div>
            </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterTitleForm;
