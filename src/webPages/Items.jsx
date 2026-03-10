// app/dashboard/items/page.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  Grid,
  List,
  Folder,
  Plus,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  ChevronLeft,
  Home,
  Image as ImageIcon,
  Package,
  FileText,
  DollarSign,
  Info,
  MoveHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useFolders } from '@/context/FolderContext';

export default function ItemsPage() {
  const {
    folders,
    setFolders,
    items,
    setItems,
    selectedFolder,
    setSelectedFolder,
  } = useFolders();

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [folderPath, setFolderPath] = useState([]);

  // Dialogs & modes
  const [showItemForm, setShowItemForm] = useState(false);
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [moveTargetFolderId, setMoveTargetFolderId] = useState(null);

  // Form fields - Item
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemImagePreview, setItemImagePreview] = useState(null);

  // Form fields - Folder
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [folderImage, setFolderImage] = useState(null);
  const [folderImagePreview, setFolderImagePreview] = useState(null);

  useEffect(() => {
    if (selectedFolder) {
      updateFolderPath(selectedFolder);
    } else {
      setFolderPath([]);
    }
  }, [selectedFolder, folders]);

  const updateFolderPath = (folder) => {
    if (!folder) {
      setFolderPath([]);
      return;
    }
    const path = [];
    let current = folder;

    const findParent = (items, id) => {
      for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
          const found = findParent(item.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    while (current) {
      path.unshift(current);
      if (!current.parentId) break;
      current = findParent(folders, current.parentId);
    }
    setFolderPath(path);
  };

  const navigateToFolder = (folder) => {
    setSelectedFolder(folder);
    setSelectedItems(new Set());
  };

  const navigateToRoot = () => {
    setSelectedFolder(null);
    setSelectedItems(new Set());
  };

  const resetItemForm = () => {
    setName('');
    setDescription('');
    setQuantity(1);
    setPrice(0);
    setCategory('');
    setNotes('');
    setItemImage(null);
    setItemImagePreview(null);
    setEditingItem(null);
  };

  const resetFolderForm = () => {
    setFolderName('');
    setFolderDescription('');
    setFolderImage(null);
    setFolderImagePreview(null);
    setEditingFolder(null);
  };

  const openAddItem = () => {
    resetItemForm();
    setShowItemForm(true);
  };

  const openAddFolder = () => {
    resetFolderForm();
    setShowFolderForm(true);
  };

  const openEditItem = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description || '');
    setQuantity(item.quantity || 1);
    setPrice(item.price || 0);
    setCategory(item.category || '');
    setNotes(item.notes || '');
    setItemImage(item.image || null);
    setItemImagePreview(item.image || null);
    setShowItemForm(true);
  };

  const openEditFolder = (folder) => {
    setEditingFolder(folder);
    setFolderName(folder.name);
    setFolderDescription(folder.description || '');
    setFolderImage(folder.image || null);
    setFolderImagePreview(folder.image || null);
    setShowFolderForm(true);
  };

  const handleItemImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setItemImage(result);
        setItemImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFolderImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setFolderImage(result);
        setFolderImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveItem = () => {
    if (!name.trim()) return;

    const itemData = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name,
      description: description || undefined,
      quantity,
      price,
      category: category || undefined,
      notes: notes || undefined,
      image: itemImage || undefined,
      folderId: selectedFolder?.id || null,
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
      modified: new Date().toISOString(),
    };

    if (editingItem) {
      setItems((prev) =>
        prev.map((it) => (it.id === editingItem.id ? itemData : it))
      );
    } else {
      setItems((prev) => [...prev, itemData]);
    }

    setShowItemForm(false);
    resetItemForm();
  };

  const saveFolder = () => {
    if (!folderName.trim()) return;

    const folderData = {
      id: editingFolder ? editingFolder.id : Date.now().toString(),
      name: folderName,
      description: folderDescription || undefined,
      image: folderImage || undefined,
      parentId: selectedFolder?.id || null,
      children: editingFolder ? editingFolder.children || [] : [],
      createdAt: editingFolder ? editingFolder.createdAt : new Date().toISOString(),
      modified: new Date().toISOString(),
    };

    if (editingFolder) {
      // Update folder
      const updateFolderInTree = (foldersList) => {
        return foldersList.map((f) => {
          if (f.id === editingFolder.id) {
            return { ...f, ...folderData };
          }
          if (f.children) {
            return { ...f, children: updateFolderInTree(f.children) };
          }
          return f;
        });
      };
      setFolders(updateFolderInTree(folders));
    } else {
      // Add new folder
      if (!selectedFolder) {
        setFolders((prev) => [...prev, folderData]);
      } else {
        const addFolderToTree = (foldersList) => {
          return foldersList.map((f) => {
            if (f.id === selectedFolder.id) {
              return {
                ...f,
                children: [...(f.children || []), folderData],
              };
            }
            if (f.children) {
              return { ...f, children: addFolderToTree(f.children) };
            }
            return f;
          });
        };
        setFolders(addFolderToTree(folders));
      }
    }

    setShowFolderForm(false);
    resetFolderForm();
  };

  const deleteFolder = (folderId) => {
    const deleteFromTree = (foldersList) => {
      return foldersList.filter((f) => {
        if (f.id === folderId) return false;
        if (f.children) {
          f.children = deleteFromTree(f.children);
        }
        return true;
      });
    };
    setFolders(deleteFromTree(folders));
  };

  const deleteItem = (itemId) => {
    setItems((prev) => prev.filter((it) => it.id !== itemId));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const deleteSelectedItems = () => {
    setItems((prev) => prev.filter((it) => !selectedItems.has(it.id)));
    setSelectedItems(new Set());
  };

  const viewItemDetail = (item) => {
    setSelectedItem(item);
    setShowItemDetail(true);
  };

  const handleMoveItem = () => {
    if (!selectedItem || moveTargetFolderId === undefined) return;

    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedItem.id ? { ...it, folderId: moveTargetFolderId === 'root' ? null : moveTargetFolderId } : it
      )
    );

    setShowMoveDialog(false);
    setMoveTargetFolderId(null);
    setSelectedItem(null);
  };

  const handleMoveSelectedItems = () => {
    if (selectedItems.size === 0 || moveTargetFolderId === undefined) return;

    setItems((prev) =>
      prev.map((it) =>
        selectedItems.has(it.id) ? { ...it, folderId: moveTargetFolderId === 'root' ? null : moveTargetFolderId } : it
      )
    );

    setShowMoveDialog(false);
    setMoveTargetFolderId(null);
    setSelectedItems(new Set());
  };

  const toggleItemSelection = (itemId, e) => {
    e?.stopPropagation();
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleAllSelection = () => {
    if (selectedItems.size === currentItemsList.filter(i => !i.isFolder).length) {
      setSelectedItems(new Set());
    } else {
      const newSet = new Set();
      currentItemsList.forEach(item => {
        if (!item.isFolder) {
          newSet.add(item.id);
        }
      });
      setSelectedItems(newSet);
    }
  };

  const getCurrentItems = () => {
    let childFolders = [];
    let folderItems = [];

    if (!selectedFolder) {
      childFolders = folders.filter((f) => !f.parentId);
      folderItems = items.filter((i) => !i.folderId);
    } else {
      const findChildren = (list, id) => {
        for (const node of list) {
          if (node.id === id) return node.children || [];
          if (node.children) {
            const found = findChildren(node.children, id);
            if (found.length) return found;
          }
        }
        return [];
      };
      childFolders = findChildren(folders, selectedFolder.id);
      folderItems = items.filter((i) => i.folderId === selectedFolder.id);
    }

    let combined = [
      ...childFolders.map((f) => ({ ...f, isFolder: true, type: 'folder' })),
      ...folderItems.map((i) => ({ ...i, isFolder: false, type: 'item' })),
    ];

    if (searchQuery) {
      combined = combined.filter((it) =>
        it.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    combined.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;

      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      if (sortBy === 'date') cmp = new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'price' && !a.isFolder && !b.isFolder) cmp = (a.price || 0) - (b.price || 0);
      if (sortBy === 'quantity' && !a.isFolder && !b.isFolder) cmp = (a.quantity || 0) - (b.quantity || 0);
      if (sortBy === 'category' && !a.isFolder && !b.isFolder) cmp = (a.category || '').localeCompare(b.category || '');
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return combined;
  };

  const currentItemsList = getCurrentItems();

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ArrowUpDown size={14} className="ml-1 opacity-50" />;
    return <ArrowUpDown size={14} className={`ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />;
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Items
            </h1>
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={navigateToRoot}
                className="h-7 px-2 text-gray-600 hover:bg-white/50"
              >
                <Home size={14} className="mr-1" />
                Root
              </Button>
              {folderPath.map((folder) => (
                <div key={folder.id} className="flex items-center">
                  <ChevronLeft size={14} className="text-gray-400 rotate-180" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToFolder(folder)}
                    className="h-7 px-2 text-gray-600 hover:bg-white/50"
                  >
                    {folder.image ? (
                      <div className="w-4 h-4 mr-1 rounded overflow-hidden">
                        <img src={folder.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <Folder size={14} className="mr-1 text-gray-400" />
                    )}
                    {folder.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={openAddFolder}
              className="border-white/30 bg-white/50 backdrop-blur-sm hover:bg-white/80"
            >
              <Folder size={16} className="mr-2" />
              New Folder
            </Button>
            <Button
              variant="outline"
              onClick={openAddItem}
              className="border-white/30 bg-white/50 backdrop-blur-sm hover:bg-white/80"
            >
              <Plus size={16} className="mr-2" />
              New Item
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="backdrop-blur-md bg-white/20 border-b border-white/20 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 border-white/30 focus:bg-white backdrop-blur-sm"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/30 bg-white/50 backdrop-blur-sm hover:bg-white/80">
                  <ArrowUpDown size={16} className="mr-2" />
                  Sort by {sortBy} ({sortOrder})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white/90 backdrop-blur-md border-white/20">
                <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy('price'); setSortOrder('asc'); }}>
                  Price
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy('quantity'); setSortOrder('asc'); }}>
                  Quantity
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy('category'); setSortOrder('asc'); }}>
                  Category
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy('date'); setSortOrder('asc'); }}>
                  Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedItems.size > 0 && (
              <>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                  {selectedItems.size} selected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMoveTargetFolderId(selectedFolder?.id || 'root');
                    setShowMoveDialog(true);
                  }}
                  className="border-white/30 bg-white/50"
                >
                  <MoveHorizontal size={14} className="mr-2" />
                  Move Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deleteSelectedItems}
                  className="border-red-200 bg-red-50/50 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete Selected
                </Button>
              </>
            )}
          </div>

          <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
            <TabsList className="bg-white/30 backdrop-blur-sm border border-white/20">
              <TabsTrigger value="grid" className="data-[state=active]:bg-white/80">
                <Grid size={16} />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-white/80">
                <List size={16} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {currentItemsList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="p-8 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl max-w-md">
              <Package size={64} className="mx-auto mb-6 text-amber-500 opacity-80" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No items yet</h3>
              <p className="text-gray-600 mb-6">
                Start organizing your inventory by adding items or creating folders
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={openAddFolder}
                  variant="outline"
                  className="border-amber-200 bg-white/50"
                >
                  <Folder size={18} className="mr-2" />
                  Create Folder
                </Button>
                <Button
                  onClick={openAddItem}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Plus size={18} className="mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {currentItemsList.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  "group cursor-pointer backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/70 hover:shadow-xl transition-all duration-300 overflow-hidden",
                  selectedItems.has(item.id) && "ring-2 ring-amber-500 bg-amber-50/60"
                )}
                onClick={() => item.isFolder ? navigateToFolder(item) : viewItemDetail(item)}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image / Placeholder */}
                  <div className="relative w-full pt-[80%] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden border-b border-white/40">
                    <div className="absolute inset-0 flex items-center justify-center p-5">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                          {item.isFolder ? (
                            <Folder size={40} className="text-amber-400/70" />
                          ) : (
                            <Package size={40} className="text-amber-400/70" />
                          )}
                        </div>
                      )}
                    </div>

                    {item.isFolder && item.children?.length > 0 && (
                      <Badge className="absolute top-3 right-3 bg-amber-600/90 text-white text-xs">
                        {item.children.length}
                      </Badge>
                    )}

                    {!item.isFolder && (
                      <input
                        type="checkbox"
                        className="absolute top-3 left-3 w-4 h-4 rounded border-gray-300"
                        checked={selectedItems.has(item.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleItemSelection(item.id, e);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="font-medium text-base mb-1 line-clamp-2 text-gray-800 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </p>

                    {!item.isFolder && (
                      <div className="text-sm text-gray-600 space-y-0.5 mt-1 mb-3">
                        {item.quantity !== undefined && <div>Qty: {item.quantity}</div>}
                        {item.price !== undefined && (
                          <div className="font-medium text-amber-700">
                            ₹{Number(item.price).toFixed(2)}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions on hover */}
                    <div className="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {!item.isFolder && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-amber-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewItemDetail(item);
                          }}
                        >
                          <Eye size={18} />
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={18} className="text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur border-white/30">
                          {item.isFolder ? (
                            <>
                              <DropdownMenuItem onClick={() => navigateToFolder(item)}>
                                <FolderOpen className="mr-2 h-4 w-4" /> Open
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditFolder(item)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => deleteFolder(item.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem onClick={() => viewItemDetail(item)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditItem(item)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedItem(item);
                                setShowMoveDialog(true);
                              }}>
                                <MoveHorizontal className="mr-2 h-4 w-4" /> Move to Folder
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white/30 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-white/40 border-white/20">
                  <TableHead className="w-8">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={selectedItems.size === currentItemsList.filter(i => !i.isFolder).length && currentItemsList.filter(i => !i.isFolder).length > 0}
                      onChange={toggleAllSelection}
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-white/40"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name <SortIcon column="name" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-white/40"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center">
                      Category <SortIcon column="category" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-white/40"
                    onClick={() => handleSort('quantity')}
                  >
                    <div className="flex items-center">
                      Quantity <SortIcon column="quantity" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-white/40"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price <SortIcon column="price" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-white/40"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Modified <SortIcon column="date" />
                    </div>
                  </TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItemsList.map((item) => (
                  <TableRow 
                    key={item.id}
                    className={cn(
                      "cursor-pointer hover:bg-white/40 border-white/20",
                      selectedItems.has(item.id) && "bg-amber-50/60"
                    )}
                    onClick={() => item.isFolder ? navigateToFolder(item) : viewItemDetail(item)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      {!item.isFolder && (
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300"
                          checked={selectedItems.has(item.id)}
                          onChange={(e) => toggleItemSelection(item.id, e)}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {item.image ? (
                          <div className="w-8 h-8 rounded overflow-hidden">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded bg-white/60 flex items-center justify-center">
                            {item.isFolder ? (
                              <Folder size={16} className="text-amber-500" />
                            ) : (
                              <Package size={16} className="text-amber-500" />
                            )}
                          </div>
                        )}
                        <span className="truncate max-w-[200px]">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/30 bg-white/30">
                        {item.isFolder ? 'Folder' : 'Item'}
                      </Badge>
                    </TableCell>
                    <TableCell>{!item.isFolder && (item.category || '-')}</TableCell>
                    <TableCell>{!item.isFolder && (item.quantity || 0)}</TableCell>
                    <TableCell>
                      {!item.isFolder && item.price !== undefined && (
                        <span className="font-medium text-amber-700">
                          ₹{Number(item.price).toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(item.modified || item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur border-white/30">
                          {item.isFolder ? (
                            <>
                              <DropdownMenuItem onClick={() => navigateToFolder(item)}>
                                <FolderOpen className="mr-2 h-4 w-4" /> Open
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditFolder(item)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => deleteFolder(item.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem onClick={() => viewItemDetail(item)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditItem(item)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedItem(item);
                                setShowMoveDialog(true);
                              }}>
                                <MoveHorizontal className="mr-2 h-4 w-4" /> Move
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Item Form (Add / Edit) */}
      <Dialog open={showItemForm} onOpenChange={(open) => {
        setShowItemForm(open);
        if (!open) resetItemForm();
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Item name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Optional description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
                placeholder="Optional category"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Image</Label>
              <div className="col-span-3 space-y-3">
                {itemImagePreview ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                    <img
                      src={itemImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => {
                        setItemImage(null);
                        setItemImagePreview(null);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                    <span className="text-xs mt-2">No image</span>
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleItemImageUpload} />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
                placeholder="Any additional notes"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowItemForm(false)}>
              Cancel
            </Button>
            <Button onClick={saveItem} disabled={!name.trim()}>
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Folder Form (Add / Edit) */}
      <Dialog open={showFolderForm} onOpenChange={(open) => {
        setShowFolderForm(open);
        if (!open) resetFolderForm();
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingFolder ? 'Edit Folder' : 'Create New Folder'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right">Name</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-3"
                placeholder="Folder name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderDescription" className="text-right">Description</Label>
              <Textarea
                id="folderDescription"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                className="col-span-3"
                placeholder="Optional description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Cover Image</Label>
              <div className="col-span-3 space-y-3">
                {folderImagePreview ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                    <img
                      src={folderImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => {
                        setFolderImage(null);
                        setFolderImagePreview(null);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                    <Folder size={32} />
                    <span className="text-xs mt-2">No cover</span>
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleFolderImageUpload} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFolderForm(false)}>
              Cancel
            </Button>
            <Button onClick={saveFolder} disabled={!folderName.trim()}>
              {editingFolder ? 'Save Changes' : 'Create Folder'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Detail Modal */}
      <Dialog open={showItemDetail} onOpenChange={setShowItemDetail}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedItem?.name}</DialogTitle>
            {selectedItem?.category && (
              <Badge variant="outline" className="mt-1 w-fit">
                {selectedItem.category}
              </Badge>
            )}
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="flex justify-center items-start">
              {selectedItem?.image ? (
                <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden border shadow-sm">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 rounded-lg bg-gray-100 flex items-center justify-center border">
                  <Package size={80} className="text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Price</h4>
                <p className="text-2xl font-bold text-amber-700">
                  ₹{(selectedItem?.price || 0).toFixed(2)}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Quantity</h4>
                <p className="text-xl">{selectedItem?.quantity || 0}</p>
              </div>

              {selectedItem?.description && (
                <div>
                  <h4 className="font-medium text-gray-700">Description</h4>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
              )}

              {selectedItem?.notes && (
                <div>
                  <h4 className="font-medium text-gray-700">Notes</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedItem.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Created: {new Date(selectedItem?.createdAt || '').toLocaleDateString()}
                </p>
                {selectedItem?.modified && (
                  <p className="text-sm text-gray-500">
                    Last modified: {new Date(selectedItem.modified).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowItemDetail(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowItemDetail(false);
                if (selectedItem) openEditItem(selectedItem);
              }}
            >
              Edit Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move to Folder Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Move {selectedItems.size > 0 ? 'Items' : 'Item'}</DialogTitle>
            <DialogDescription>
              {selectedItems.size > 0 
                ? `Move ${selectedItems.size} selected items to a folder`
                : `Select a folder to move "${selectedItem?.name}" to`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select 
              value={moveTargetFolderId === null ? 'root' : moveTargetFolderId || 'root'} 
              onValueChange={(value) => setMoveTargetFolderId(value === 'root' ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">Root (no folder)</SelectItem>
                {folders.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={selectedItems.size > 0 ? handleMoveSelectedItems : handleMoveItem}>
              Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}