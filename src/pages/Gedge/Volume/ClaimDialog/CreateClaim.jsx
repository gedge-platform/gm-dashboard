import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { swalError } from "../../../../utils/swal-utils";

import { CDialogNew } from "../../../../components/dialogs";
import claimStore from "../../../../store/Claim";
import deploymentStore from "../../../../store/Deployment";
import projectStore from "../../../../store/Project";
import StorageClassStore from "../../../../store/StorageClass";
import ClaimBasicInformation from "./ClaimBasicInformation";
import VolumeAdvancedSetting from "../Dialog/VolumeAdvancedSetting";
import VolumYamlPopup from "../Dialog/VolumYamlPopup";
import VolumePopup from "../Dialog/VolumePopup";
import { plPL } from "@mui/x-data-grid";
import volumeStore from "../../../../store/Volume";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
`;

const CreateClaim = observer((props) => {
    const { open } = props;
    const [stepValue, setStepValue] = useState(1);
    const { setProjectListinWorkspace } = projectStore;
    const {
        claimName,
        //volumeName,
        //setVolumeName,
        setClaimName,
        accessMode,
        volumeCapacity,
        setVolumeCapacity,
        responseData,
        setResponseData,
        content,
        setContent,
        clearAll,
        createVolume,
        setProject,
        project,
        // selectClusters,
        setSelectClusters,
        clusterName,
        setAccessMode,
    } = claimStore;
    const { selectClusters } = volumeStore;
    const { workspace, setWorkspace } = deploymentStore;
    const { storageClass, setStorageClass, selectStorageClass, setSelectStorageClass } = StorageClassStore;
    const template = {

        apiVersion: "v1",
        kind: "PersistentVolumeClaim",
        metadata: {
            name: claimName,
            namespace: project,
            labels: {
              app: "",
            },
        },
        spec: {
            storageClassName: storageClass,
            accessModes: [accessMode],
            resources: {
              requests: {
                storage: Number(volumeCapacity) + "Gi",
              },
            },
        },
    };

    const onClickStepOne = (e) => {
      console.log(storageClass);
        if (claimName === "") {
            swalError("Claim 이름을 입력해주세요");
            return;
        }
        if (workspace === "") {
          swalError("Workspace를 선택해주세요");
          return;
        }
        if (project === "") {
          swalError("Project를 선택해주세요");
          return;
        }
        if (selectClusters.length === 0) {
          swalError("클러스터를 확인해주세요!");
          return;
        }
        if (selectStorageClass === "") {
          
          swalError("StorageClass를 선택해주세요");
          return;
        }
        if (accessMode === "") {
          console.log("storage: " + storageClass);
          swalError("Access Mode를 선택해주세요");
          return;
        }
        if (volumeCapacity === "") {
          swalError("Volume 용량을 입력해주세요");
          return;
        } else {
          setStepValue(2);
          console.log(e);
        }
      };

      const handleClose = () => {
        props.reloadFunc && props.reloadFunc();
        props.onClose && props.onClose();
        setProjectListinWorkspace();
        setStepValue(1);
        clearAll();
        setClaimName("");
        setSelectClusters("");
        setWorkspace("");
        setProject("");
        setSelectStorageClass("");
      };
    
      const onClickStepTwo = () => {
        setStepValue(3);
      };
    
      const handlePreStepValue = () => {
        setProjectListinWorkspace();
        clearAll();
        setClaimName("");
        setSelectClusters("");
        setWorkspace("");
        setProject("");
        setSelectStorageClass("");
        
      };
    
      const CreateVolume = () => {
        // for문으로 복수의 클러스터이름 보내게
        createVolume(require("json-to-pretty-yaml").stringify(template));
        handleClose();
        // setSelectClusters();
      };
    
      useEffect(() => {
        if (stepValue === 3) {
          const YAML = require("json-to-pretty-yaml");
          setContent(YAML.stringify(template));
        }
      }, [stepValue]);

      const stepOfComponent = () => {
        if (stepValue === 1) {
            return (
                <>
                    <ClaimBasicInformation />
                    <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button onClick={handleClose}>취소</Button>
              <ButtonNext onClick={(e) => onClickStepOne(e)}>다음</ButtonNext>
            </div>
          </div>
                </>
            );
        } else if (stepValue === 2) {
            return (
                <>
                 <VolumeAdvancedSetting />
                 <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "240px",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  handlePreStepValue();
                  setStepValue(1);
                }}
              >
                이전
              </Button>
              <ButtonNext onClick={() => onClickStepTwo()}>다음</ButtonNext>
            </div>
          </div>
                </>
            );
        } else if (stepValue === 3) {
            return (
                <>
                    <VolumYamlPopup />
                    <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "300px",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => setStepValue(2)}>이전</Button>
              <ButtonNext onClick={() => CreateVolume()}>
                Schedule Apply
              </ButtonNext>
            </div>
          </div>
                </>
            );
        } else <VolumePopup />
      };

      return (
        <CDialogNew
            id="myDialog"
            open={open}
            maxWidth="md"
            title={"Create Claim"}
            onClose={handleClose}
            bottomArea={false}
            modules={["custom"]}
        >
            {stepOfComponent()}
        </CDialogNew>
      );
});

export default CreateClaim;