import { toast } from "sonner";

const validatePassword = (password: string,confirmPassword: string): boolean => {
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    toast.error("Password must contain at least one uppercase letter.");
    return false;
  }
  if (!/[a-z]/.test(password)) {
    toast.error("Password must contain at least one lowercase letter.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  return true;
};

export default validatePassword;