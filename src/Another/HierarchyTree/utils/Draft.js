// 1. onEditPermissionDirectory
// 2. onCreateDirectory
// 3. onDeleteDirectory
// 4. onEditDirectory

// 5. onSelectDirectory

// 6. onUpdateFieldSchema
// 7. onSetReadonlySchema

// 8. onGetConvertedData

const ActionComponents = (props) => {
    const { convertedItem, convertedTreeItem, onSetReadonlySchema } = props;
    const { nodeId } = convertedItem;
  
    const onEditPermissionDirectory = (nodeId) => {
      window.open = `https://${baseURL}/${nodeId}`;
    };
  
    const onCreateDirectory = (nodeId) => {
      window.open = `https://${baseURL}/${nodeId}`;
    };
  
    const onDeleteDirectory = (nodeId) => {
      window.open = `https://${baseURL}/${nodeId}`;
    };
  
    const onEditDirectory = () => {
      window.open = `https://${baseURL}/${nodeId}`;
    };
  
    return (
      <>
        <div data-item={nodeId} onClick={onEditPermissionDirectory}>
          Edit Permission
        </div>
        <div data-item={nodeId} onClick={onCreateDirectory}>
          Create Directory
        </div>
        <div data-item={nodeId} onClick={onDeleteDirectory}>
          Delete Directory
        </div>
        <div data-item={nodeId} onClick={onEditDirectory}>
          Edit Directory
        </div>
        <input data-item type="checkbox" onChange={onSetReadonlySchema}/>
      </>
    );
  };
  
  const TreeContainer = (props) => {
    return <></>;
  };
  
  const Container = (props) => {
      const {onSetReadonlySchema} = props
    const [data, setData] = useState();
    const onSelectDirectory = (nodeId) => {
      const urlAPI = `https://awing.com.vn/api/${nodeId}`;
      const data = fetch(urlAPI);
      setData(data);
    };
  
    const onGetCheckListSchema = (checkList) => checkList;
    const onCheckReadOnlySchema = (checkList) => checkList;
  
    const checkListSchema = onGetCheckListSchema();
    const checkReadOnlySchema = onCheckReadOnlySchema();
  
    const onGetConvertedData = () => {};
    return (
      <>
        {data && <div>{data}</div>}
        <TreeContainer
          actionComponents={ActionComponents}
          onGetConvertedData={onGetConvertedData}
          onSelectDirectory={onSelectDirectory}
          onSetReadonlySchema={onSetReadonlySchema}
        />
      </>
    );
  };
  
  const ParentContainer = () => {
      const [listReadonly, setListReadonly] = useState()
      const onSetReadonlySchema = (checkList => {
          setListReadonly(checkList)
      })
  
      const handleSaveBtn = () => {
          fetch(`https://${listReadonly}`)
      }
      return (
          <>
              <Container onSetReadonlySchema={onSetReadonlySchema}/>
              <SaveButton handleSaveBtn={handleSaveBtn} />
          </>
      )
  
  }
  
  const ButtonSave = (props) => {
      const {handleSaveBtn} = props
      return (
          <button onClick={handleSaveBtn}>
              Save Button
          </button>
      )
  }