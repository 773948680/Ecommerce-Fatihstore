import Sidebar from "@/components/admin/Sidebar";
import React from "react";
import { useFormik } from "formik";
import {
  addProductInitialValues,
  addProductValidationSchema,
} from "@/validations/addProduct";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/pages/_app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProducts = () => {
  const formik = useFormik({
    initialValues: addProductInitialValues,
    validationSchema: addProductValidationSchema,
    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, "products"), values);
        toast.success("Produit ajouté avec succès");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    },
  });

  return (
    <div>
      <div className="mt-40 ">
        <h1 className="text-center mb-10 text-4xl font-semibold text-gray-900 dark:text-white">
          Ajouter un produit
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="border-2 p-8 max-w-lg mx-auto"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom du produit
            </label>
            <input
              type="text"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Iphone 11"
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description du produit
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Votre description du produit"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Catégorie du produit
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Catégorie du produit"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500">{formik.errors.category}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Prix du produit
            </label>
            <input
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Prix du produit"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              URL de l'image
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="URL de l'image"
              id="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500">{formik.errors.image}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ajouter le produit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProducts;
