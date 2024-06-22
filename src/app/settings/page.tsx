"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { uploadResume, createCoverLetter } from "@/state/serverActions";
import { useGetUserQuery } from "@/state/api";
import { MOCK_USER_ID } from "@/state";
import { File } from "lucide-react";

const resumeUploadSchema = z.object({
  resumeFile: z
    .any()
    .refine((fileList: FileList | null) => fileList && fileList.length > 0, {
      message: "File is required",
    }),
});
const coverLetterSchema = z.object({
  title: z.string().min(1, "Cover letter title is required"),
  content: z.string().min(1, "Cover letter is required"),
});

const Settings = () => {
  const { data: user } = useGetUserQuery({
    userId: MOCK_USER_ID,
  });

  // Resume form
  const resumeForm = useForm({
    resolver: zodResolver(resumeUploadSchema),
    defaultValues: {
      resumeFile: null,
    },
  });
  const {
    handleSubmit: handleResumeSubmit,
    reset: resetResume,
    register,
    formState: { errors: resumeErrors },
  } = resumeForm;
  const { execute: executeUploadResume, status: uploadResumeStatus } =
    useAction(uploadResume);

  // Cover letter form
  const coverLetterForm = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: { title: "", content: "" },
  });
  const {
    handleSubmit: handleCoverLetterSubmit,
    reset: resetCoverLetter,
    formState: { errors: coverLetterErrors },
  } = coverLetterForm;
  const { execute: executeCreateCoverLetter, status: createCoverLetterStatus } =
    useAction(createCoverLetter);

  // server action handlers
  const handleUploadResume: SubmitHandler<
    z.infer<typeof resumeUploadSchema>
  > = async ({ resumeFile }) => {
    if (resumeFile && resumeFile[0] && user) {
      executeUploadResume({
        userId: user.userId,
        resumeUrl: resumeFile[0].name,
        fileName: resumeFile[0].name,
      });
      resetResume();
    }
  };

  const handleCreateCoverLetter: SubmitHandler<
    z.infer<typeof coverLetterSchema>
  > = async ({ title, content }) => {
    if (!user) return;
    executeCreateCoverLetter({
      userId: user?.userId,
      title,
      content,
    });
    resetCoverLetter();
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 px-[38px] ">
      <div className="container  rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
        {/* Resume Upload */}
        <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">
          Resume Settings
        </h1>
        <Form {...resumeForm}>
          <form
            onSubmit={handleResumeSubmit(handleUploadResume)}
            className="space-y-6"
          >
            <FormField
              control={resumeForm.control}
              name="resumeFile"
              render={({ field }) => (
                <FormItem className="text-gray-700 dark:text-gray-200">
                  <FormLabel>Upload Resume</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        {...register("resumeFile")}
                        type="file"
                        className="w-[190px] p-2 rounded"
                        onChange={(e) => field.onChange(e.target.files)}
                        placeholder=""
                      />
                      {resumeErrors.resumeFile && (
                        <FormMessage className="text-gray-700 dark:text-gray-200">
                          {resumeErrors.resumeFile.message}
                        </FormMessage>
                      )}
                    </>
                  </FormControl>
                  <Button
                    type="submit"
                    disabled={uploadResumeStatus === "executing"}
                    className="rounded hover:bg-blue-800 dark:text-gray-200 mt-2"
                  >
                    Upload Resume
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Cover Letter Creation */}
        <h1 className="text-2xl font-bold my-4 text-gray-700 dark:text-gray-200">
          Cover Letter Settings
        </h1>
        <Form {...coverLetterForm}>
          <form
            onSubmit={handleCoverLetterSubmit(handleCreateCoverLetter)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={coverLetterForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="text-gray-700 dark:text-gray-200">
                  <FormLabel>Cover Letter Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Title"
                      className="w-full block p-2 border rounded"
                    />
                  </FormControl>
                  <FormMessage>{coverLetterErrors.title?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={coverLetterForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="text-gray-700 dark:text-gray-200">
                  <FormLabel>Cover Letter</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your cover letter here"
                      // className="w-full h-32 block p-2 border border-gray-300 rounded-md"
                      className="rounded"
                    />
                  </FormControl>
                  <FormMessage className="">
                    {coverLetterErrors.content?.message}
                  </FormMessage>
                  <Button
                    type="submit"
                    disabled={createCoverLetterStatus === "executing"}
                    className="rounded hover:bg-blue-800 dark:text-gray-200"
                  >
                    Save Cover Letter
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
