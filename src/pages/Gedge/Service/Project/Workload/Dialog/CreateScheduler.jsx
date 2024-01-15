import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import BasicInformation from "./BasicInformation";
import PodSettins from "./PodSettins";
import { deploymentStore, projectStore, schedulerStore } from "@/store";
import DeploymentYaml from "./DeploymentYaml";
import DeploymentPopup from "./DeploymentPopup";
import { randomString } from "@/utils/common-utils";
import { CDialogNew } from "@/components/dialogs";
import { stringify } from "json-to-pretty-yaml2";

const Button = styled.button`
  background-color: #fff;
  border: 1px solid black;
  color: black;
  padding: 10px 35px;
  margin-right: 10px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const ButtonNext = styled.button`
  background-color: #0f5ce9;
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 4px;
  /* box-shadow: 0 8px 16px 0 rgb(35 45 65 / 28%); */
`;

const CreateScheduler = observer((props) => {
  const { open } = props;
  const [stepValue, setStepValue] = useState(1);

  const {
    podReplicas,
    content,
    containerName,
    containerImage,
    containerPort,
    project,
    workspace,
    setContent,
    clearAll,
  } = deploymentStore;
  const { setProjectListinWorkspace } = projectStore;
  const { postWorkload, postScheduler2 } = schedulerStore;

  const template = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "",
      namespace: project,
      labels: {
        app: "",
      },
    },
    spec: {
      replicas: podReplicas,
      selector: {
        matchLabels: {
          app: "",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "",
          },
        },
        spec: {
          containers: [
            {
              image: containerImage,
              name: containerName,
              ports: [
                {
                  containerPort: Number(containerPort),
                },
              ],
            },
          ],
        },
      },
    },
  };

  const handleClose = () => {
    props.onClose && props.onClose();
    setProjectListinWorkspace();
    setStepValue(1);
    clearAll();
  };

  const createScheduler = () => {
    const requestId = `workload-${randomString()}`;
    postWorkload(requestId, workspace, project);
    // postWorkload(requestId, workspace, project);
    postScheduler2(requestId, content, handleClose);
    props.reloadFunc && props.reloadFunc();
  };
  useEffect(() => {
    if (stepValue === 1) {
      setContent(stringify(template));
    }
  }, [stepValue]);

  const stepOfComponent = () => {
    if (stepValue === 1) {
      return (
        <>
          <BasicInformation />
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
              <Button onClick={handleClose}>취소</Button>
              <ButtonNext onClick={createScheduler}>Schedule Apply</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 2) {
      return (
        <>
          <PodSettins />
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
              <Button onClick={() => setStepValue(1)}>이전</Button>
              <ButtonNext onClick={createScheduler}>Schedule Apply</ButtonNext>
            </div>
          </div>
        </>
      );
    } else if (stepValue === 3) {
      return (
        <>
          <DeploymentYaml />
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
              <ButtonNext onClick={createDeployment}>Schedule Apply</ButtonNext>
              {/* <ButtonNext onClick={createDeployment}>Default Apply</ButtonNext> */}
            </div>
          </div>
        </>
      );
    } else return <DeploymentPopup />;
  };

  return (
    <CDialogNew
      id="myDialog"
      open={open}
      maxWidth="md"
      title={"Create Workload"}
      onClose={handleClose}
      bottomArea={false}
      modules={["custom"]}
    >
      {stepOfComponent()}
    </CDialogNew>
  );
});
export default CreateScheduler;
