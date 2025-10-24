import RegisterForm from "../components/forms/register/RegisterForm";
import type { FormValues } from "../components/forms/register/schema";
import { updateProfile } from "../store/user/userAction";
import { useAppDispatch, useAppSelector } from "../store";
import { newId } from "../helpers/fileHelper";

const Register = () => {
  const dispatch = useAppDispatch();
  const updateLoader = useAppSelector((store) => store.user.loader.update);

  const handleSubmit = async (values: FormValues) => {
    await dispatch(
      updateProfile({
        id: newId(),
        name: values.name.trim(),
        surname: values.surname.trim(),
      })
    ).unwrap();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your name and surname to get started
          </p>
        </div>

        <RegisterForm
          onSubmit={handleSubmit}
          isSubmitting={updateLoader === "pending"}
        />
      </div>
    </div>
  );
};

export default Register;
