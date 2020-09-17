import Signup, { SignupInitParams } from "@src/types/signup";
import signupRepo from '@src/ports/repos/signup';
import { v4 } from "uuid";

export default async (signupInitParams :SignupInitParams) :Promise<Signup> => {
  const signup: Signup = {
    token: v4(),
    initParams: signupInitParams,
    status: 'IN_PROGRESS'
  }

  await signupRepo.insert(signup);
  return signup;
}