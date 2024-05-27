import { makeAutoObservable, runInAction, toJS } from "mobx";
import axios from "axios";
import { SERVER_URL } from "../config";

class Template {
  containerImageList = [
    {
      name: "web",
      versions: ["adamkdean/redirect"],
      port: 80,
      env: [
        { name: "REDIRECT_STATUS_CODE", value: "307" },
        {
          name: "REDIRECT_LOCATION",
          value: "https://templates.iqonic.design/metordash-node/",
        },
        { name: "PRESERVE_URL", value: "true" },
      ],
      type: "NodePort",
    },
    {
      name: "nginx",
      versions: ["latest", "1.24.0", "1.23.0", "1.20.0"],
      port: 80,
      type: "NodePort",
    },
    {
      name: "mysql",
      versions: ["latest", "8.0", "5.7.43"],
      port: 3306,
      env: [
        { name: "MYSQL_ROOT_PASSWORD", value: "hello123!@#" },
        { name: "MYSQL_DATABASE", value: "database_name" },
      ],
      type: "ClusterIP",
    },
  ];

  deploymentYamlTemplate = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "",
    },
    spec: {
      replicas: 1,
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
              name: "",
              image: "",
              ports: [
                {
                  containerPort: 80,
                },
              ],
              // env 배열이 비어 있지 않은 경우에만 추가
              // ...(env.length > 0 && { env: env }),
            },
          ],
        },
      },
    },
  };

  webYamlTemplate = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "",
    },
    spec: {
      replicas: 1,
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
              name: "",
              image: "adamkdean/redirect",
              ports: [
                {
                  containerPort: 80,
                },
              ],
              env: [
                {
                  name: "REDIRECT_STATUS_CODE",
                  value: "https://templates.iqonic.design/metordash-node/",
                },
                {
                  name: "PRESERVE_URL",
                  value: "true",
                },
              ],
            },
          ],
        },
      },
    },
  };

  serviceYamlTemplate = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "",
    },
    spec: {
      selector: {
        app: "",
      },
      ports: [
        {
          protocol: "TCP",
          port: 80,
          targetPort: 80,
        },
      ],
      type: "",
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  setDeploymentYamlTemplateFromAppInfo = (appInfo) => {
    this.deploymentYamlTemplate.metadata.name = appInfo.appName + "-deployment";
    this.deploymentYamlTemplate.spec.replicas = appInfo.appReplicas;
    this.deploymentYamlTemplate.spec.selector.matchLabels.app =
      appInfo.app + "-" + appInfo.appName;
    this.deploymentYamlTemplate.spec.template.metadata.labels.app =
      appInfo.app + "-" + appInfo.appName;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].name =
      appInfo.appName;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].image =
      appInfo.appVersion;
    if (appInfo.app === "web") {
      this.deploymentYamlTemplate.spec.template.spec.containers[0].image =
        appInfo.appVersion;
    } else {
      this.deploymentYamlTemplate.spec.template.spec.containers[0].image =
        appInfo.app + ":" + appInfo.appVersion;
    }
    this.deploymentYamlTemplate.spec.template.spec.containers[0].env =
      appInfo.appEnv;
    this.deploymentYamlTemplate.spec.template.spec.containers[0].ports[0].containerPort =
      appInfo.appPort;

    this.serviceYamlTemplate.metadata.name = appInfo.appName + "-service";
    this.serviceYamlTemplate.spec.selector.app =
      appInfo.app + "-" + appInfo.appName;
    this.serviceYamlTemplate.spec.ports[0].port = appInfo.appPort;
    this.serviceYamlTemplate.spec.ports[0].targetPort = appInfo.appPort;
    if (appInfo.app === "mysql") {
      this.serviceYamlTemplate.spec.type = "ClusterIP";
    } else {
      this.serviceYamlTemplate.spec.type = "NodePort";
    }
  };

  yoloTemplate1 = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
      name: "yolo-runtime-scnario",
      namespace: "p-test-9b4aa182-fd56-497d-95ef-0d0b2fb2da10",
      labels: {
        app: "runtime-test",
      },
    },
    spec: {
      containers: [
        {
          name: "ubuntu",
          image: "softonnet/runtime_test:v0.0.3.240520",
          imagePullPolicy: "IfNotPresent",
        },
      ],
    },
  };

  yoloTemplate2 = {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "cfmap-yolov5-scenario",
    },
    data: {
      "path.sh": `#!/bin/bash
      echo export PATH=$NEW_PATH:$PATH >> $HOME/.bashrc`,
    },
  };

  yoloTemplate3 = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
      name: "yolov5-inference-server",
      labels: {
        app: "yolo-test",
      },
    },
    spec: {
      containers: [
        {
          name: "ubuntu",
          image: "softonnet/yolov5/inference_test:v0.0.1.230616",
          imagePullPolicy: "IfNotPresent",
          command: ["/bin/bash", "-c"],
          args: [
            "source /root/path.sh; PATH=/opt/conda/envs/pt1.12.1_py38/bin:/root/volume/cuda/cuda-11.3/bin:$PATH; env; sh /script.sh;tail -f /dev/null",
          ],
          env: [
            {
              name: "NEW_PATH",
              value:
                "/opt/conda/envs/pt1.12.1_py38/bin:/root/volume/cuda/cuda-11.3/bin",
            },
            {
              name: "LD_LIBRARY_PATH",
              value:
                "/root/volume/cuda/cuda-11.3/lib64:/root/volume/cudnn/cudnn-linux-x86_64-8.5.0.96_cuda11-archive/lib:/root/volume/tensorrt/TensorRT-8.4.3.1-cuda-11/lib",
            },
          ],
          resources: {
            limits: {
              cpu: "4",
              memory: "8G",
              "nvidia.com/gpu": "1",
            },
          },
          volumeMounts: [
            {
              mountPath: "/root/path.sh",
              name: "fileconfig",
              subPath: "path.sh",
            },
            {
              mountPath: "/root/volume/cuda/cuda-11.3",
              name: "nfs-volume-total",
              subPath: "cuda/cuda-11.3",
              readOnly: true,
            },
            {
              mountPath:
                "/root/volume/cudnn/cudnn-linux-x86_64-8.5.0.96_cuda11-archive",
            },
            {
              name: "nfs-volume-total",
              subPath: "cudnn/cudnn-linux-x86_64-8.5.0.96_cuda11-archive",
              readOnly: true,
            },
            {
              mountPath: "/opt/conda/envs/pt1.12.1_py38",
              name: "nfs-volume-total",
              subPath: "envs/pt1.12.1_py38",
              readOnly: true,
            },
            {
              mountPath: "/root/volume/tensorrt/TensorRT-8.4.3.1-cuda-11/",
              name: "nfs-volume-total",
              subPath: "tensorrt/TensorRT-8.4.3.1-cuda-11",
              readOnly: true,
            },
            {
              mountPath: "/root/volume/dataset/coco128",
              name: "nfs-volume-total",
              subPath: "dataset/coco128",
              readOnly: true,
            },
          ],
        },
      ],
      volumes: [
        {
          name: "nfs-volume-total",
          persistentVolumeClaim: {
            claimName: "nfs-pvc-total",
          },
        },
        {
          name: "fileconfig",
          configMap: {
            name: "cfmap-yolov5-scenario",
            defaultMode: "0777",
          },
        },
      ],
    },
  };

  yoloTemplate4 = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "yolo-np",
    },
    spec: {
      type: "NodePort",
      ports: [
        {
          port: 3000,
          targetPort: 3000,
          nodePort: 30021,
          name: "restapi-torch ",
        },
      ],
      selector: {
        app: "yolo-test",
      },
    },
  };

  yoloTemplate5 = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "runtime-np",
    },
    spec: {
      type: "NodePort",
      ports: [
        {
          port: 5000,
          targetPort: 5000,
          nodePort: 30022,
          name: "runtime",
        },
      ],
      selector: {
        app: "runtime-test",
      },
    },
  };

  yoloTemplate6 = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: {
      name: "yolo-detection",
      labels: {
        app: "yolo-detection",
      },
    },
    spec: {
      containers: [
        {
          name: "yolo8",
          image: "edy100/yolo8:1.0",
          ports: [{ containerPort: 80 }],
          resources: {
            limits: {
              "nvidia.com/gpu": "1",
            },
          },
        },
      ],
    },
  };

  yoloTemplate7 = {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "yolo-detection-service",
    },
    spec: {
      type: "NodePort",
      selector: {
        app: "yolo-detection",
      },
      ports: [
        {
          name: "http",
          port: 80,
          targetPort: 80,
        },
      ],
    },
  };
}

const templateStore = new Template();
export default templateStore;
