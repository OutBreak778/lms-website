"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";



const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is Required",
  }),
});

const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    console.log(values);
    try {
        const res = await axios.post("/api/courses", values)
        router.push(`/teacher/courses/${res.data.id}`)
        toast.success("Course Created Successfully")
    } catch (error) {
        toast.error("Something went wrong!")
    }
    
    
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">New Course!</h1>
        <p className="text-sm text-muted-foreground text-slate-600">
          What would you like to name course ? Don't worry, you can change it
          later!
        </p>
        <Form {...form}>
          <form
            className="space-y-8 mt-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Advanced Web Development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-slate-400 ">
                    What will your topic of the content ?
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
                <Link href="/">
                    <Button variant="ghost" type="button">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                    Submit
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
