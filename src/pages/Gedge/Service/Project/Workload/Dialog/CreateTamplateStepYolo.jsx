import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { deploymentStore } from "@/store";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import templateStore from "../../../../../../store/Template";
import { stringify } from "json-to-pretty-yaml2";

const CreateTamplateStepYolo = observer(() => {
  const { appInfo, deployment } = deploymentStore;

  const {
    deploymentYamlTemplate,
    serviceYamlTemplate,
    setDeploymentYamlTemplateFromAppInfo,
    yoloTemplate1,
    yoloTemplate2,
    yoloTemplate3,
    yoloTemplate4,
    yoloTemplate5,
    yoloTemplate6,
    yoloTemplate7,
  } = templateStore;

  // useEffect(() => {
  //   setDeploymentYamlTemplateFromAppInfo(appInfo);
  // }, []);

  return (
    <>
      <div className="step-container">
        <div className="signup-step">
          <div className="step">
            <span>기본 정보</span>
          </div>
          <div className="arr"></div>
          <div className="step">
            <span>스케줄러</span>
          </div>
          <div className="arr"></div>
          <div className="step current">
            <span>설정 검토</span>
          </div>
        </div>
      </div>
      <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="editor"
        width="90%"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={stringify(yoloTemplate6) + "---\n" + stringify(yoloTemplate7)}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 4,
        }}
        readOnly={true}
      />
    </>
  );
});

export default CreateTamplateStepYolo;
