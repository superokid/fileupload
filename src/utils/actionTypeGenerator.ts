const actionTypeGenerator = (actionName: string) => {
  return {
    request: `${actionName}_REQUEST`,
    success: `${actionName}_SUCCESS`,
    error: `${actionName}_ERROR`,
    default: actionName,
  };
};
export default actionTypeGenerator;
