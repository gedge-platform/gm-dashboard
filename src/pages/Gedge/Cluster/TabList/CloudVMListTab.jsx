import React, { useState, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CDeleteButton } from "@/components/buttons/CDeleteButton";
import { observer } from "mobx-react";
import clusterStore from "../../../../store/Cluster";
import CreateVM from "../Dialog/CreateVM";
import { drawStatus } from "../../../../components/datagrids/AggridFormatter";

const CloudVMListTab = observer(() => {
  const [open, setOpen] = useState(false);
  const [reRun, setReRun] = useState(false);
  const [vmName, setVMName] = useState("");

  const { deleteVM, loadVMList, currentPage, totalPages, viewList, goPrevPage, goNextPage, totalElements } = clusterStore;

  const [columDefs] = useState([
    {
      headerName: "제공자",
      field: "ProviderName",
      filter: true,
    },
    {
      headerName: "이름",
      field: "IId.NameId",
      filter: true,
    },
    {
      headerName: "상태",
      field: "VmStatus",
      filter: true,
      cellRenderer: ({ value }) => {
        return drawStatus(value);
      },
    },
    {
      headerName: "스펙",
      field: "VMSpecName",
      filter: true,
    },
    {
      headerName: "이미지",
      field: "ImageIId.NameId",
      filter: true,
    },
    {
      headerName: "VPC",
      field: "VpcIID.NameId",
      filter: true,
    },
    {
      headerName: "키페어",
      field: "KeyPairIId.NameId",
      filter: true,
    },
    {
      headerName: "리전",
      field: "Region.Region",
      filter: true,
    },
    {
      headerName: "Private",
      field: "PrivateIP",
      filter: true,
    },
    {
      headerName: "Public",
      field: "PublicIP",
      filter: true,
    },
    {
      headerName: "SSH",
      field: "SSHAccessPoint",
      filter: true,
    },
  ]);

  const handleClick = e => {
    setVMName(e.data.name);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (vmName === "") {
      swalError("VM을 선택해주세요!");
    } else {
      swalUpdate(vmName + "를 삭제하시겠습니까?", () => deleteVM(vmName, reloadData));
    }
    setVMName("");
  };

  const reloadData = () => {
    setReRun(true);
  };

  useLayoutEffect(() => {
    loadVMList();
    return () => {
      setReRun(false);
    };
  }, [reRun]);

  return (
    <>
      <CReflexBox>
        <PanelBox>
          <CommActionBar>
            <CCreateButton onClick={handleOpen}>생성</CCreateButton>
            <CDeleteButton onClick={handleDelete}>삭제</CDeleteButton>
          </CommActionBar>

          <div className="tabPanelContainer">
            {/* <CTabPanel value={tabvalue} index={0}> */}
            <div className="grid-height2">
              <AgGrid
                rowData={viewList}
                columnDefs={columDefs}
                isBottom={false}
                onCellClicked={handleClick}
                totalElements={totalElements}
                totalPages={totalPages}
                currentPage={currentPage}
                goNextPage={goNextPage}
                goPrevPage={goPrevPage}
              />
            </div>
            {/* </CTabPanel> */}
          </div>
          <CreateVM open={open} onClose={handleClose} reloadFunc={reloadData} />
        </PanelBox>
        {/* <Detail cluster={clusterDetail} /> */}
      </CReflexBox>
    </>
  );
});
export default CloudVMListTab;
