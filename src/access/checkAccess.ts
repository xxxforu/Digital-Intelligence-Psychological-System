import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess = ACCESS_ENUM.NOT_LOGIN
) => {
  // 获取当前登录用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.role ?? ACCESS_ENUM.NOT_LOGIN;
 
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果学生登录才能访问
  if (needAccess === ACCESS_ENUM.STUDENT) {
    // 如果用户没登录，那么表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果普通教师登录才能访问
  if (needAccess === ACCESS_ENUM.TEACHER) {
    // 如果用户没登录，那么表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果心理老师才能访问
  if (needAccess === ACCESS_ENUM.PSYCHOLOGIST) {
    // 如果不是管理员，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.PSYCHOLOGIST) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
