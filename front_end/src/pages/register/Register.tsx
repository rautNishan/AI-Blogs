import Forms from "../../components/common/forms/Forms";

export default function Register() {
  //Handle Register
  const register = () => {
    console.log("This is Register");
  };
  
  return (
    <div className="">
      <Forms formType="Register" register={true} fun={register} />
    </div>
  );
}
