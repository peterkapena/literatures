"use client";
import * as React from "react";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TextField from "@/components/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ProfileFormSchema,
  ProfileFormSchemaType,
  ProfileValidationResult,
} from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/joy";
import { updateCreateProfile, getProfile } from "./_actions";
import Profile from "@/models/schema/Profile";
import { Notice } from "@/components/Notice";
import { SubmitLoadingButton } from "@/components/SubmitLoadingButton";

function page() {
  const { data: session } = useSession();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [result, setResult] = useState<ProfileValidationResult>();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   getProfile((session as any)?.user.id).then((pr) => {
  //     const prfl: Profile = JSON.parse(pr);
  //     console.log(prfl);
  //     setProfile(prfl);
  //   });
  // }, [(session as any)?.user.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        if ((session as any)?.user.id) {
          const pr = await getProfile((session as any)?.user.id);
          const prfl: Profile = JSON.parse(pr);
          console.log(prfl);
          setProfile(prfl);

          // Reset the form with the fetched profile data
          reset({
            firstName: prfl.firstName,
            lastName: prfl.lastName,
            cell: prfl.cell,
            // ... add other fields as necessary
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error here
      }
    }

    loadProfile();
  }, [(session as any)?.user.id, reset]); // Add reset to the dependency array

  const processForm: SubmitHandler<ProfileFormSchemaType> = async (data) => {
    setIsLoading(true);
    try {
      const rslt = await updateCreateProfile(
        data,
        (session as any)?.user.id,
        profile?._id
      );

      setMessages(["Profile updated successfully."]);
      setResult(JSON.parse(rslt));
      setIsSuccess(Boolean(rslt));
    } catch (error) {
      setMessages(["An error happened. Please contact support."]);
    }
    setShowSubmitButton(false);
    setIsLoading(false);
  };

  return (
    <div>
      {session?.user?.name && (
        <Card>
          <div>
            <Typography level="h2">Personal info</Typography>
            <Typography level="body-sm">
              Customize your profile information.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(processForm)}>
            <Divider />

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
              <Grid xs={12} sm={4} md={4}>
                <TextField
                  disabled={Boolean(!showSubmitButton && result)}
                  defaultValue={profile?.firstName}
                  label={"First name"}
                  fieldName="firstName"
                  placeholder="First name"
                  register={register}
                  fieldError={errors.firstName}
                  type="text"
                ></TextField>
              </Grid>
              <Grid xs={12} sm={4} md={4}>
                <TextField
                  disabled={Boolean(!showSubmitButton && result)}
                  defaultValue={profile?.lastName}
                  label={"Last name"}
                  fieldName="lastName"
                  placeholder="Last name"
                  register={register}
                  fieldError={errors.lastName}
                  type="text"
                ></TextField>
              </Grid>
              <Grid xs={12} sm={4} md={4}>
                <TextField
                  disabled={Boolean(!showSubmitButton && result)}
                  defaultValue={profile?.cell}
                  label={"Cell number"}
                  fieldName="cell"
                  placeholder="Cell number"
                  register={register}
                  fieldError={errors.cell}
                  type="tel"
                ></TextField>
              </Grid>
            </Grid>

            {showSubmitButton && (
              <SubmitLoadingButton
                isLoading={isLoading}
                title="Submit"
              ></SubmitLoadingButton>
            )}
            {!showSubmitButton && messages.length > 0 && (
              <Notice
                isSuccess={isSuccess}
                onClose={() => {
                  setShowSubmitButton(true);
                  setMessages([]);
                }}
                messages={messages}
              />
            )}
            {/* {!showSubmitButton && result?.success && (
              <AlertDialogModal
                message={"Your profile has been updated."}
                onYes={() => {}}
                onClose={() => {}}
                type="notice"
              ></AlertDialogModal>
            )} */}
          </form>
        </Card>
      )}
    </div>
  );
}

export default page;
