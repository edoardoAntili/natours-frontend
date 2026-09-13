function OverviewBoxDetail({ label, text, icon }) {
  return (
    <div className="text-[1.5rem] flex items-center font-normal [&_svg]:mr-5 not-last:mb-9">
      <svg className="h-9 w-9 fill-[#55c57a]">
        <use href={`/img/icons.svg#icon-${icon}`} />
      </svg>

      <span className="font-bold uppercase text-[1.4rem] mr-9">{label}</span>

      <span className="capitalize">{text}</span>
    </div>
  );
}

export default OverviewBoxDetail;
