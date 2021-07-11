import { AnActionEvent } from '@/classes/base/action/an-action'



describe('AnAction', () => {

  let anActionEvent: AnActionEvent;

  it('should construct a new actionEvent with an action type and eventAction', () => {
    const actionEvent: string = 'some url to a page';
    anActionEvent = new AnActionEvent('Navigation', actionEvent);
    expect(anActionEvent.actionType).toEqual('Navigation');
    expect(anActionEvent.eventAction).toEqual(actionEvent);
  });

  it('should return an object of type ActionEvent when toObject is called', () => {
    const actionEvent: string = 'some url to a page';
    anActionEvent = new AnActionEvent('Navigation', actionEvent);
    const actionObject = anActionEvent.toObject;
    expect(actionObject.eventAction).toEqual(actionEvent);
    expect(actionObject.actionType).toEqual('Navigation');
  })
})
