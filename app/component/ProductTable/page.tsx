"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(0);
  const [focusedCellIndex, setFocusedCellIndex] = useState<number>(0);

  const router = useRouter();

  const handleLogout = () => {
    // Clear session cookie on logout
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authenticated");

    router.push("/"); // Using router.navigate instead of router.push
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  const handleCellClick = (rowIndex: any, image: string) => {
    setSelectedImage(image);
    setFocusedRowIndex(rowIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp" && focusedRowIndex !== null) {
      setFocusedRowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "ArrowDown" && focusedRowIndex !== null) {
      setFocusedRowIndex((prevIndex) =>
        Math.min(prevIndex + 1, products.length - 1)
      );
    } else if (event.key === "ArrowLeft" && focusedCellIndex !== null) {
      // Move focus to the previous cell in the current row
      setFocusedCellIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "ArrowRight" && focusedCellIndex !== null) {
      // Move focus to the next cell in the current row
      setFocusedCellIndex((prevIndex) =>
        Math.min(prevIndex + 1, columns.length - 1)
      );
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <Image src={params.value} alt="Product" width={300} height={300} />
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end p-2 ">
        <button
          className="bg-pink-400 p-2 rounded text-white font-bold shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-between p-2 bg-white ">
        <DataGrid
          rows={products}
          columns={columns}
          checkboxSelection={false}
          paginationMode="server"
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableRowSelectionOnClick
          onCellClick={(params) =>
            handleCellClick(params.rowNode, params.row.image)
          }
          className="MuiDataGrid-root"
        />
        {selectedImage && (
          <div>
            <Image src={selectedImage} alt="Product" width={500} height={300} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductTable;
