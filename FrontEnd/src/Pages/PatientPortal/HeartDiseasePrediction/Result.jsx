import Header from "../Header";
import Layout from "../Layout";

const Result = () => {
  return (
    <Layout>
      <Header />
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8rem",
        }}
      ></div>
    </Layout>
  );
};

export default Result;
