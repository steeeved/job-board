"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAction } from "next-safe-action/hooks";
import { addJob } from "@/state/serverActions";

const jobPostSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  companyLogo: z.string().url().optional(),
  description: z.string().min(1, "Job description is required"),
  longDescription: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  salaryRange: z.string().optional(),
  postedByUserId: z.string().min(1, "User ID is required"),
  specialties: z.array(z.string()).optional(),
  availability: z.string().optional(),
});
type JobPostFormData = z.infer<typeof jobPostSchema>;

const NewJob = () => {
  const [formSubmissionComplete, setFormSubmissionComplete] = useState(false);
  const form = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      company: "",
      companyLogo: "",
      description: "",
      longDescription: "",
      location: "",
      employmentType: "",
      salaryRange: "",
      postedByUserId: "",
      specialties: [],
      availability: "",
    },
  });

  const { execute, status } = useAction(addJob, {
    onSuccess(data) {
      form.reset();
      setFormSubmissionComplete(true);
      setTimeout(() => setFormSubmissionComplete(false), 4000);
    },
  });

  const onSubmit: SubmitHandler<JobPostFormData> = async (data) => {
    execute(data);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto px-[38px] rounded-xl bg-gray-1 dark:bg-black">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded"
        >
          {formSubmissionComplete && (
            <div
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
              role="alert"
            >
              Job posting added successfully!
            </div>
          )}
          <div className="flex gap-6">
            {/* Job Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel className="">Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Job Title"
                      {...field}
                      disabled={status === "executing"}
                      className="rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Job Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Job Description"
                      {...field}
                      disabled={status === "executing"}
                      className="rounded-[6px] shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            {/* Company Name */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Company Name"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Logo */}
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Company Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Company Logo URL"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded"
                      placeholder="Long Description"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Location"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Long Description */}

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={status === "executing"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-Time</SelectItem>
                        <SelectItem value="Part-time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary Range */}
            <FormField
              control={form.control}
              name="salaryRange"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Salary Range"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Employment Type */}

          <div className="flex gap-6">
            {/* Posted By User Id */}
            <FormField
              control={form.control}
              name="postedByUserId"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Posted By User ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Posted By User ID"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Availability */}
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="flex-1 text-gray-700 dark:text-gray-200">
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={status === "executing"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="On-Site">On-Site</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Slave-Labor">Slave-Labor</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Specialties */}
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === "executing"}
            className="rounded hover:bg-blue-800 dark:text-gray-200"
          >
            Post Job
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewJob;
