import userService from './user.service'
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    console.log('error', error)
    return res.status(400).json({
      success: false,
      message: 'user Created Failed',
    })
  }
}
export default {
  createUser,
}
