import React, { useState, useEffect, useLayoutEffect } from "react";
import { PanelBox } from "@/components/styles/PanelBox";
import CommActionBar from "@/components/common/CommActionBar";
import { AgGrid } from "@/components/datagrids";
import { agDateColumnFilter, dateFormatter } from "@/utils/common-utils";
import Layout from "@/layout";
import { CReflexBox } from "@/layout/Common/CReflexBox";
import { CCreateButton } from "@/components/buttons";
import { CIconButton } from "@/components/buttons";
import { CTabPanel } from "@/components/tabs";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import Detail from "../Detail";
import clusterStore from "../../../../store/Cluster";
import CreateCluster from "../Dialog/CreateCluster";
import Terminal from "../Dialog/Terminal";
import { Title } from "@/pages";
import { drawStatus } from "../../../../components/datagrids/AggridFormatter";

const CoreClusterListTab = observer(() => {
  const currentPageTitle = Title.CloudZone;
  const [open, setOpen] = useState(false);
  const [tabvalue, setTabvalue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabvalue(newValue);
  };
  const [openTerminal, setOpenTerminal] = useState(false);
  const { clusterDetail, clusterList, loadClusterList, loadCluster, currentPage, totalPages, viewList, goPrevPage, goNextPage, totalElements } =
    clusterStore;

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
    {
      headerName: "VM",
      field: "terminal",
      minWidth: 100,
      maxWidth: 100,
      cellRenderer: function () {
        // return `<span class="state_ico_new terminal" onClick></span> `;
        return `<button class="tb_volume_yaml" onClick>Terminal</button>`;
      },
      cellStyle: { textAlign: "center" },
    },
  ]);

  const history = useHistory();

  const handleClick = e => {
    let fieldName = e.colDef.field;
    loadCluster(e.data.clusterName);
    if (fieldName === "terminal") {
      handleOpenTerminal();
    }
  };

  const handleOpen = e => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTerminal = () => {
    setOpenTerminal(true);
  };

  const handleCloseTerminal = () => {
    setOpenTerminal(false);
  };

  useLayoutEffect(() => {
    loadClusterList("cloud");
  }, []);

  return (
    <Layout currentPageTitle={currentPageTitle}>
      <CReflexBox>
        <PanelBox>
          <CommActionBar
          // reloadFunc={() => loadClusterList("core")}
          // isSearch={true}
          // isSelect={true}
          // keywordList={["이름"]}
          >
            <CCreateButton onClick={handleOpen}>생성</CCreateButton>
            {/* <CSelectButton items={[]}>{"All Cluster"}</CSelectButton> */}
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
          <Terminal
            open={openTerminal}
            // yaml={getYamlFile}
            onClose={handleCloseTerminal}
          />
          {/* <CreateCluster type={"core"} open={open} onClose={handleClose} /> */}
          <CreateCluster type={"cloud"} open={open} onClose={handleClose} />
        </PanelBox>
        {/* <Detail cluster={clusterDetail} /> */}
      </CReflexBox>
    </Layout>
  );
});
export default CoreClusterListTab;
