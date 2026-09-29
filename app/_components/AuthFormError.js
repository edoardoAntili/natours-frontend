export default async function AuthFormError({ searchParams }) {
  const { error } = await searchParams;

  if (!error) return null;

  return (
    <p role="alert" className="mt-8 text-[#eb4d4b] text-[1.4rem]">
      {error}
    </p>
  );
}
