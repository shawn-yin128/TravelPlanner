import {Card, List} from "antd";
import CheckDailyPlanDetailButton from "./plans/CheckDailyPlanDetailButton";
import DeleteDailyPlanButton from "./plans/DeleteDailyPlanButton";
import CheckRouteButton from "./plans/CheckRouteButton";
import CheckTimeLineButton from "./plans/CheckTimeLineButton";
import AddPlanButton from "./plans/AddPlanButton";

const PlanManagerBlock = (props) => {
    const {plans, authed, handleRoute, handleDelete} = props;

    const authedUserActions = [<CheckRouteButton handleRoute={handleRoute}/>, <AddPlanButton plans={plans}/>]
    const unAuthedUserActions = [<CheckRouteButton handleRoute={handleRoute}/>]

    return (
        <Card style={{backgroundColor: 'rgba(255,255,255,0.5)', width: '100%'}}
              title="Daily Plans"
              actions={authed ? authedUserActions : unAuthedUserActions}
              extra={<CheckTimeLineButton plans={plans}/>}>
            <List itemLayout="horizontal"
                  style={{maxHeight: '65vh', overflow: 'scroll'}}
                  dataSource={plans}
                  renderItem={(item) =>
                      <List.Item style={{backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '10px'}}
                                 actions={[<CheckDailyPlanDetailButton data={item}/>,
                                     <DeleteDailyPlanButton data={item} handleDelete={handleDelete}/>]}>
                          <List.Item.Meta title={item.place}
                                          description={item.date}/>
                      </List.Item>
                  }/>
        </Card>
    );
}

export default PlanManagerBlock;