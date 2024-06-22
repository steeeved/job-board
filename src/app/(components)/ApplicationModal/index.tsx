"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetResumesQuery,
  useGetCoverLettersQuery,
  useSubmitApplicationMutation,
  useGetUserQuery,
  Resume,
} from "@/state/api";
import { MOCK_USER_ID } from "@/state";
import { v4 as uuidv4 } from "uuid";

const applicationSchema = z.object({
  coverLetter: z.string().min(1, "Cover letter is required"),
  resumeId: z.string().min(1, "Resume is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof applicationSchema>;

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [newCoverLetter, setNewCoverLetter] = useState("");

  // Form initialization
  const form = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
      resumeId: "",
      notes: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = form;

  // RTK Query Hooks
  const { data: user } = useGetUserQuery({
    userId: MOCK_USER_ID,
  });
  const userId = user?.userId;
  const { data: resumes } = useGetResumesQuery(userId ? { userId } : skipToken);
  const { data: coverLetters } = useGetCoverLettersQuery(
    userId ? { userId } : skipToken
  );
  const [submitApplication, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();

  // Form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!userId) return;
    await submitApplication({
      applicantUserId: userId,
      jobId: uuidv4(),
      coverLetter: newCoverLetter || data.coverLetter,
      resumeId: data.resumeId,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[50%] bg-white dark:bg-gray-800 rounded p-6 dark:border-none">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-gray-700 dark:text-gray-200">
                Apply for Job
              </DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-200">
                Fill out the form below to apply for the job.
              </DialogDescription>
            </DialogHeader>

            {/* Cover Letter */}
            <FormField
              control={control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <div className="flex justify-between items-center">
                        <FormLabel className="basis-3/5 text-gray-700 dark:text-gray-200">
                          Cover Letter
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setValue("coverLetter", value);
                            const selected = coverLetters?.find(
                              (cl) => cl.content === value
                            );
                            if (selected) {
                              setNewCoverLetter(selected.content);
                            }
                          }}
                          defaultValue={watch("coverLetter")}
                        >
                          <SelectTrigger className=" text-gray-700 dark:text-gray-200">
                            <SelectValue
                              placeholder="Select Cover Letter"
                              className=" dark:placeholder-gray-1 text-gray-1"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {coverLetters?.map((cl) => (
                              <SelectItem
                                key={cl.coverLetterId}
                                value={cl.content}
                              >
                                {cl.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        {...register("coverLetter")}
                        placeholder="Write your cover letter here"
                        value={newCoverLetter}
                        onChange={(e) => setNewCoverLetter(e.target.value)}
                      />
                    </>
                  </FormControl>
                  <FormMessage>{errors.coverLetter?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Resume */}
            <FormField
              control={control}
              name="resumeId"
              render={({ field }) => (
                <FormItem className="rounded">
                  <FormLabel className="basis-3/5 text-gray-700 dark:text-gray-200">
                    Choose Resume
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className=" text-gray-700 dark:text-gray-200">
                        <SelectValue
                          placeholder="Select Resume"
                          className=" dark:placeholder-gray-1"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {resumes?.map((resume: Resume, i: number) => (
                          <SelectItem
                            key={resume.resumeId}
                            value={resume.resumeId}
                          >
                            {resume.fileName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.resumeId?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Extra Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any additional information"
                      className="rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded hover:bg-blue-800 dark:text-gray-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="rounded"
              >
                Close
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
