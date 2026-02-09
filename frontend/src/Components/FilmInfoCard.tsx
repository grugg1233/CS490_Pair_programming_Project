type FilmInfoCardProps = {
  open: boolean;
};


const FilmInfoCard = ({ open }: FilmInfoCardProps) => {
  if (!open) return null;

  return (
    <div className="card card-sm bg-red-600 w-64 shadow-md">
      <div className="card-body">
        <p className="text-white">
          This is a card. You can use any element as a dropdown.
        </p>
      </div>
    </div>
  );
};

export default FilmInfoCard;
