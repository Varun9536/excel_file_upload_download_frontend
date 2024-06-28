export default function Fileslist({ list }) {




    const get_file = async (e) => {


        let downloadExcelResponse = await fetch("https://excel-file-upload-download-backend.onrender.com/v1/onefile", {
            method: "post",
            body: JSON.stringify({ id: e.target.id }),
            headers: {
                "Content-Type": "application/json"
            }
        })


        const downloadExcelBlob = await downloadExcelResponse.blob();
        const downloadExcelObjectURL = URL.createObjectURL(downloadExcelBlob);


        // downloadExcelLink.href = downloadExcelObjectURL;



        const url = downloadExcelObjectURL

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xlsx'); // Specify the filename

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up: remove the link element and revoke the blob URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);


    }


    return (
        <div className="container">
            <div className="list_heading" style={{ fontSize: "25px", fontFamily: "cursive", textAlign: "center" }}> Files List</div>


            <div className="files" style={{ padding: "20px 0px", height: "500px", overflow: "auto" }} >
                {list && list.map((item) =>
                (
                    <>
                        <div style={{ margin: "20px 0px", border: "2px solid green", padding: "10px 0px", borderRadius: "10px" }}>
                            <span style={{ fontSize: "20px", margin: "0px 80px" }}>{item.name}</span>
                            <span style={{ fontSize: "20px", margin: "0px 80px" }} >{item.createdAt}</span>
                            <button style={{ fontSize: "17px", padding: "7px 20px", borderRadius: "15px", border: "none", margin: "0px 30px", background: " #009933", color: "white" }} id={item._id} onClick={get_file}>Download</button>
                            {/* <button style={{ fontSize: "17px", padding: "7px 20px", borderRadius: "15px", border: "none"  , background : "#bb2d3b" , color : "white"  }} id={item.id}>Delete</button> */}


                        </div>

                    </>

                ))}


            </div>
        </div>
    )
}
