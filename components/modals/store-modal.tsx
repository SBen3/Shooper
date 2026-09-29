"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useState } from "react";
import { Modal } from "../ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success("Store Created.");
    } catch (error) {
      console.log("error");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Store"
      description="Create a new store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="Name"
                placeholder="E-commerce"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <FieldDescription>
                  {form.formState.errors.name.message}
                </FieldDescription>
              )}
            </Field>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
