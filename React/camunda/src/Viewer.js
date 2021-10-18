import React, { createRef, Component } from "react";
import BpmnViewer from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
import {
  PlusSquareTwoTone,
  MinusSquareTwoTone,
  CloseSquareTwoTone,
  LeftSquareTwoTone,
} from "@ant-design/icons";
import axios from "axios";

class Diagram extends Component {
  constructor(props) {
    super(props);
    this.containerRef = createRef();
  }

  getListInstance(activityId) {
    const actId = {
      activityIdIn: [activityId],
    };
    axios
      .post(
        "http://localhost:8080/engine-rest/process-instance",
        JSON.stringify(actId),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        this.props.setListProcessInstances(res.data);
      });
  }

  componentDidMount() {
    const {
      diagram: {
        xml,
        statistics,
        historyActivityInstance,
        activityInstance,
        instanceInfo,
      },
    } = this.props;

    const container = this.containerRef.current;
    this.viewer = new BpmnViewer({
      container,
      height: 500,
    });

    const eventBus = this.viewer.get("eventBus");
    eventBus.on("element.click", (e) => {
      console.log(e);
      if (e.element.type === "bpmn:CallActivity") {
        this.props.setDiagram(e.element.businessObject.calledElement);
      } else {
        axios
          .post(
            "http://localhost:8080/engine-rest/process-instance",
            JSON.stringify({ activityIdIn: [e.element.id] }),
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            this.props.setListProcessInstances(res.data);
          });
      }
    });
    if (xml.bpmn20Xml) {
      this.importXML(
        xml.bpmn20Xml,
        this.viewer,
        statistics,
        historyActivityInstance,
        activityInstance,
        instanceInfo
      );
    }
  }

  componentDidUpdate() {
    const {
      xml,
      statistics,
      historyActivityInstance,
      activityInstance,
      instanceInfo,
    } = this.props.diagram;
    if (xml) {
      this.importXML(
        xml.bpmn20Xml,
        this.viewer,
        statistics,
        historyActivityInstance,
        activityInstance,
        instanceInfo
      );
    }
  }

  // destroy bpmn diagram
  componentWillUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }

  importXML = (
    xml,
    Viewer,
    statistics,
    historyActivityInstance,
    activityInstance,
    instanceInfo
  ) => {
    if (xml) {
      Viewer.importXML(xml, (err) => {
        if (err) {
          return console.error("could not import BPMN 2.0 diagram", err);
        }
        const canvas = Viewer.get("canvas");
        const overlays = Viewer.get("overlays");
        // zoom to fit full viewport
        canvas.zoom("fit-viewport", "auto");
        if (
          historyActivityInstance &&
          historyActivityInstance.length > 0 &&
          instanceInfo &&
          activityInstance
        ) {
          const currentTask2 = [];
          const history = historyActivityInstance.map((elm) => elm.activityId);
          let subTask = null;
          if (
            instanceInfo.state !== "COMPLETED" &&
            activityInstance.childActivityInstances
          ) {
            if (
              activityInstance.childActivityInstances[0].childActivityInstances
                .length > 0
            ) {
              subTask = activityInstance.childActivityInstances[0].activityId;
              activityInstance.childActivityInstances[0].childActivityInstances.map(
                (child) => {
                  currentTask2.push(child.activityId);
                  return null;
                }
              );
            } else {
              activityInstance.childActivityInstances.map((c) =>
                currentTask2.push(c.activityId)
              );
            }
          }
          try {
            history.map((elm) => {
              return canvas.addMarker(elm, "complete");
            });
          } catch (ex) {
            console.error("Error import xml", ex);
          }
        } else {
          try {
            statistics.map((item) => {
              canvas.addMarker(item.id, "currentTask");
              overlays.add(item.id, "note", {
                position: {
                  bottom: 10,
                  left: -10,
                },
                html: `<div class="diagram-note">${item.instances}</div>`,
              });
              return null;
            });
          } catch (ex) {
            console.log("Error import xml", ex);
          }
        }
        return null;
      });
    }
  };

  render() {
    return <div ref={this.containerRef} />;
  }
}

// render diagram with button
const DiagramWithButton = class DiagramWithButton extends Diagram {
  zoomInOut = (number, viewer) => {
    viewer.get("zoomScroll").stepZoom(number);
    return null;
  };

  resetZoom = (viewer) => {
    const canvas = viewer.get("canvas");
    canvas.zoom("fit-viewport", "auto");
    return null;
  };

  back = () => {
    this.props.setDiagram("SC");
    this.props.setListProcessInstances([]);
    this.props.setActivityInstance(null);
    this.props.setInstanceInfo(null);
  };

  render() {
    return (
      <>
        <div ref={this.containerRef} />
        <div>
          <PlusSquareTwoTone
            onClick={() => this.zoomInOut(1, this.viewer)}
            style={{ fontSize: 30 }}
            twoToneColor="#52c41a"
          />
          <MinusSquareTwoTone
            onClick={() => this.zoomInOut(-1, this.viewer)}
            style={{ fontSize: 30 }}
            twoToneColor="#eb2f96"
          />
          <CloseSquareTwoTone
            onClick={() => this.resetZoom(this.viewer)}
            style={{ fontSize: 30 }}
          />
          <LeftSquareTwoTone
            onClick={() => this.back()}
            style={{ fontSize: 30 }}
            twoToneColor="#eb2f96"
          />
        </div>
      </>
    );
  }
};

export default DiagramWithButton;
