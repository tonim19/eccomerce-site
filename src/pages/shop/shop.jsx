import { useEffect } from "react";
import { Outlet, Route, Routes, useParams } from "react-router";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import CollectionPage from "../collection/collection";
import {
  convertCollectionsSnapshotToMap,
  db,
} from "../../firebase/firebase.utils";
import { collection, getDocs } from "@firebase/firestore";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop-actions";
import { useState } from "react";
import WithSpinner from "../../components/with-spinner/with-spinner";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {
  let params = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { updateCollections } = props;
      const collectionRef = collection(db, "collections");
      const docSnap = await getDocs(collectionRef);
      const collectionsMap = convertCollectionsSnapshotToMap(docSnap);
      updateCollections(collectionsMap);
      setLoading(false);
    };
    fetchData();
  });
  return (
    <div className="shop-page">
      <Routes>
        <Route
          path="/"
          element={
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          }
        />
        <Route
          path="/:collectionId"
          element={
            <CollectionPageWithSpinner
              params={params}
              isLoading={loading}
              {...props}
            />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionsMap) =>
      dispatch(updateCollections(collectionsMap)),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
