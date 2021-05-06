import SaveIcon from "@material-ui/icons/Save";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Company, Email, Name, Nif, Surname, Telephone } from "./FormUtils";

export default function UserInfoForm({ userInfo, updateUserInfo }) {
  const intialValuesForm = { ...userInfo, photo: undefined };
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: intialValuesForm,
  });

  /*    setValue('name',userInfo?.name);
    setValue('surname',userInfo?.surname);
    setValue('email',userInfo?.email);
    setValue('company',userInfo?.company);
    setValue('nif',userInfo?.nif);
    setValue('tel',userInfo?.tel);
*/

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateUserInfo(data);
      })}
      className="userInfoForm"
    >
      <div>
        <Name register={register} errors={errors} />
        <Surname register={register} errors={errors} />
        <Email register={register} errors={errors} />
        <Company register={register} errors={errors} />
        <Nif register={register} errors={errors} />
        <Telephone register={register} errors={errors} />
      </div>
      <Button
        className="userSaveButton"
        type="submit"
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
      >
        Guardar
      </Button>
    </form>
  );
}
