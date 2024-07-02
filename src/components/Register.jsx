import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

export function RegisterComponent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formValid, setFormValid] = useState(true);

  const handleSubmit = async () => {
    //checks if one of the parameters is empty.
    if (!firstName || !lastName || !email || !password) {
      setFormValid(false);
      return;
    }

    //output the parameter values
    console.warn(firstName + " " + lastName + " " + email + " " + password);

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //Bad Request
    // if (result.status == 400) {
    //   toast({
    //     title: "Uh oh! Something went wrong.",
    //     description: `${
    //       firstName + " " + lastName + " " + email + " " + password
    //     }`,
    //   });

    //   return;
    // }

    //using await function to wait .json method to process.
    result = await result.json();
    console.warn(result);

    toast({
      title: "Success! User account created.",
      description: "User account created.",
    });
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen w-screen">
        <Card className="flex flex-col justify-between w-[634px] h-[800px] p-12">
          <CardHeader>
            <CardTitle className="font-extrabold text-2xl">SNKRS</CardTitle>
            <CardDescription>One stop sneaker store.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="content-header mb-5">
                <CardTitle className="font-bold text-2xl">
                  Create Account
                </CardTitle>
                <CardDescription>
                  Enter your credentials below to create your account.
                </CardDescription>
              </div>

              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    placeholder="Name of your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  {/* checks if the form is not valid and the first name is empty */}
                  {!formValid && !firstName && (
                    <Label htmlFor="fname" className="text-rose-500">
                      First name should not empty.
                    </Label>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    placeholder="Name of your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {/* checks if the form is not valid and the first name is empty */}
                  {!formValid && !lastName && (
                    <Label htmlFor="lname" className="text-rose-500">
                      Last name should not empty.
                    </Label>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="Name of your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* checks if the form is not valid and the first name is empty */}
                  {!formValid && !email && (
                    <Label htmlFor="email" className="text-rose-500">
                      First name should not empty.
                    </Label>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* checks if the form is not valid and the first name is empty */}
                  {!formValid && !password && (
                    <Label htmlFor="password" className="text-rose-500">
                      password name should not empty.
                    </Label>
                  )}

                  <div className="flex items-center my-2">
                    <Checkbox
                      id="terms"
                      checked={showPassword}
                      onCheckedChange={() => setShowPassword(!showPassword)}
                    />
                    <label
                      htmlFor="terms"
                      className="pl-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show Password
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              Cancel
            </Button>

            <Button onClick={() => handleSubmit()}>Create an account</Button>
            <Toaster />
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
