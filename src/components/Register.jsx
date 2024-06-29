import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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

export function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);

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
                  <Input id="fname" placeholder="Name of your first name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input id="lname" placeholder="Name of your last name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="Name of your email" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                  ></Input>
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
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button>Create me an account</Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
