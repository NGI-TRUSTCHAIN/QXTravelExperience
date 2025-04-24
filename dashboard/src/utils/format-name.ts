import { Anonymous } from "@/interface/customer";

export const formatName = ({
  firstName,
  lastName,
}: {
  firstName: string | null;
  lastName: string | null;
}) => {
  if(firstName === Anonymous && lastName === Anonymous) {
    return Anonymous;
  }
  if (!firstName && !lastName) {
    return "Anonymous";
  }
  return `${firstName || ""} ${lastName || ""}`.trim();
};
