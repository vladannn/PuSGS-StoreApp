using AutoMapper;
using Microsoft.AspNetCore.Http;
using StoreApp.DTOs;
using StoreApp.Models;

public class ImageFileToByteArrayResolver : IValueResolver<RegisterDTO, User, byte[]>
{
    public byte[] Resolve(RegisterDTO source, User destination, byte[] destMember, ResolutionContext context)
    {
        if (source.ImageFile != null)
        {
            using var memoryStream = new MemoryStream();
            source.ImageFile.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
        return null;
    }
}
