import BreweryDetail from "../src/Components/BreweryDetail";
import Header from "../src/Components/Header";

const DetailView = () => {
  return (
    <>
      <div className="detail--page">
        <Header />
        <div className="detail--content">
          <BreweryDetail /> 
        </div>
      </div>
    </>
  );
};

export default DetailView;