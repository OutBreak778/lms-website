"use client"

import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { ConfirmModal } from '@/components/modals/confirmModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CourseActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

const CourseActions: React.FC<CourseActionsProps> = ({disabled, courseId, isPublished}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const onClick = async () => {
      try {
        setIsLoading(true);
  
        if (isPublished) {
          await axios.patch(`/api/courses/${courseId}/unpublish`);
          toast.success("Course unpublished");
        } else {
          await axios.patch(`/api/courses/${courseId}/publish`);
          toast.success("Course published");
          router.push(`/teacher/courses`)

        }
  
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("Course Deleted")
            router.push(`/teacher/courses/${courseId}`)
            router.refresh()
        } catch (error) {
            console.log("error",error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="flex items-center gap-x-4">
        <Button disabled={disabled || isLoading} variant="outline" size="sm" onClick={onClick}>
            {isPublished ? "unpublish" : "publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
            <Trash2Icon className='w-4 h-4' />
        </Button>
        </ConfirmModal>
    </div>
  )
}

export default CourseActions