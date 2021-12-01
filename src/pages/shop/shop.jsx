import { Outlet, Route, Routes, useParams } from "react-router";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import CollectionPage from "../collection/collection";

const ShopPage = () => {
  let params = useParams();
  return (
    <div className="shop-page">
      <Routes>
        <Route path="/" element={<CollectionsOverview />} />
        <Route
          path="/:collectionId"
          element={<CollectionPage params={params} />}
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default ShopPage;
