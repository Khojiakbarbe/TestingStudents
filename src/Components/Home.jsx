import React from "react";


export default function Home() {
    return (
        <div className="home">
            <h2 className="text-center">Bilmingizni biz bilan mustahkamlang</h2>
            <h6 className="text-center mt- mb-5" >Quyida mavzu va test sonini tanlang </h6>
            {/* <Timer /> */}

            <div className=" homeRow">
                <div className="row">
                    <div className="col-4">
                        <h6>Mavzuni tanlang</h6>
                        <select class="form-select form-select-sm p-2" aria-label=".form-select-sm example">
                            <option selected>For & While</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <h6>Testlar soni</h6>
                        <select class="form-select form-select-sm p-2" aria-label=".form-select-sm example">
                            <option selected>5</option>
                            <option value="1">10</option>
                            <option value="2">15</option>
                            <option value="3">20</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <h6>Vaqtni tanlang (minut)</h6>
                        <select class="form-select form-select-sm p-2" aria-label=".form-select-sm example">
                            <option selected>1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                        </select>
                    </div>
                </div>
                <button id="boshlashBtn">Boshlash</button>
            </div>
        </div>
    )
}