import React from "react";
import Layout from "../components/Layout";
import BadRequestError from "../components/BadRequestError";

export default function BadRequestPage() {
  return (
    <Layout>
      <BadRequestError />
    </Layout>
  );
}
