/* eslint-disable no-unused-vars */
const actions = (props) => {
  const { id } = props;
  const handleAction1 = (id) => {
    //router.push(`https://awing.com.vn/directory?id=${id}`)
  };
  const handleAction2 = (id) => {
    //router.push(`https://awing.com.vn/directory?id=${id}`)
  };

  const handleAction3 = async (id) => {
    try {
      //await fetch(`https://awing.com.vn/api/directory?id=${id}`)
    } catch (error) {
      //console.log(error)
    }
  };

  return (
    <>
      <div onClick={() => handleAction1(id)}>Action1</div>
      <div onClick={() => handleAction2(id)}>Action2</div>
      <div onClick={() => handleAction3(id)}>Action3</div>
    </>
  );
};


/**

 */